const gtmTag = "<your tag here>";

(function (w, d, s, l, i) {
  w[l] = w[l] || [];
  w[l].push({ "gtm.start": new Date().getTime(), event: "gtm.js" });
  var f = d.getElementsByTagName(s)[0],
    j = d.createElement(s),
    dl = l != "dataLayer" ? "&l=" + l : "";
  j.async = true;
  j.src = "https://www.googletagmanager.com/gtm.js?id=" + i + dl;
  f.parentNode.insertBefore(j, f);
})(window, document, "script", "dataLayer", gtmTag);

function pushEcommerceData(eventName, srcEvent, ecommerceData) {
  console.log("Detected event:", srcEvent.name);
  console.table(srcEvent);
  console.log("Pushing event:", eventName);
  console.table(ecommerceData);
  console.log("Items:", ecommerceData?.items?.length ?? 0);
  console.table(ecommerceData?.items);

  // Clear the previous ecommerce object
  // Prevents multiple ecommerce events on a page from affecting each other
  window.dataLayer.push({ ecommerce: null });

  // Push the new ecommerce object
  window.dataLayer.push({
    event: eventName,
    timestamp: srcEvent.timestamp,
    id: srcEvent.id,
    user_id: srcEvent.clientId,
    url: srcEvent.context.document.location.href,
    ecommerce: ecommerceData,
  });
}

function itemFromVariant(variant) {
  const product = variant?.product;

  return {
    item_id: variant?.sku,
    item_name: product?.title,
    item_brand: product?.vendor,
    item_category: product?.type,
    price: variant?.price?.amount,
  };
}

function itemFromCheckoutLineItem(lineItem) {
  const variant = lineItem?.variant;
  const discountAllocation = lineItem?.discountAllocations?.[0];
  const quantity = lineItem?.quantity ?? 1;
  const perItemDiscount = (discountAllocation?.amount?.amount ?? 0) / quantity;

  return {
    ...itemFromVariant(variant),
    price: variant?.price?.amount - perItemDiscount,
    quantity,
    coupon: discountAllocation?.discountApplication?.title,
    discount: perItemDiscount,
  };
}

function itemFromCartLine(lineItem) {
  const variant = lineItem?.merchandise;

  return {
    ...itemFromVariant(variant),
    price: variant?.price?.amount,
    quantity: lineItem?.quantity ?? 1,
  };
}

analytics.subscribe("product_viewed", (event) => {
  const variant = event.data.productVariant;

  pushEcommerceData("view_item", event, {
    currency: variant?.price?.currencyCode,
    value: variant?.price?.amount,
    items: [
      {
        ...itemFromVariant(variant),
        quantity: 1,
      },
    ],
  });
});

analytics.subscribe("product_added_to_cart", (event) => {
  const cartLine = event.data?.cartLine;
  const variant = cartLine?.merchandise;

  pushEcommerceData("add_to_cart", event, {
    currency: cartLine?.cost?.totalAmount?.currencyCode,
    value: cartLine?.cost?.totalAmount?.amount,
    items: [
      {
        ...itemFromVariant(variant),
        quantity: cartLine?.quantity,
      },
    ],
  });
});

analytics.subscribe("product_removed_from_cart", (event) => {
  const cartLine = event.data?.cartLine;
  const variant = cartLine?.merchandise;

  pushEcommerceData("remove_from_cart", event, {
    currency: cartLine?.cost?.totalAmount?.currencyCode,
    value: cartLine?.cost?.totalAmount?.amount,
    items: [
      {
        ...itemFromVariant(variant),
        quantity: cartLine?.quantity,
      },
    ],
  });
});

analytics.subscribe("checkout_started", (event) => {
  const checkout = event.data?.checkout;

  pushEcommerceData("begin_checkout", event, {
    currency: checkout?.currencyCode,
    value: checkout?.totalPrice?.amount,
    coupon: checkout?.discountApplications?.[0]?.title,
    items: checkout?.lineItems?.map(itemFromCheckoutLineItem),
  });
});

analytics.subscribe("checkout_completed", (event) => {
  const checkout = event.data?.checkout;

  pushEcommerceData("purchase", event, {
    currency: checkout?.currencyCode,
    value: checkout?.totalPrice?.amount,
    coupon: checkout?.discountApplications?.[0]?.title,
    transaction_id: checkout?.order?.id,
    shipping: checkout?.shippingLine?.price?.amount,
    tax: checkout?.totalTax?.amount,
    items: checkout?.lineItems?.map(itemFromCheckoutLineItem),
  });
});

analytics.subscribe("cart_viewed", (event) => {
  const cart = event.data?.cart;

  pushEcommerceData("view_cart", event, {
    currency: cart?.cost?.totalAmount?.currencyCode,
    value: cart?.cost?.totalAmount?.amount,
    items: cart?.lines?.map(itemFromCartLine),
  });
});

analytics.subscribe("collection_viewed", (event) => {
  const collection = event.data?.collection;

  pushEcommerceData("view_item_list", event, {
    item_list_id: collection?.id,
    item_list_name: collection?.title,
    items: collection?.productVariants?.map(itemFromVariant),
  });
});

analytics.subscribe("search_submitted", (event) => {
  const searchResult = event.data?.searchResult;

  pushEcommerceData("search", event, {
    search_term: searchResult?.query,
  });
});
