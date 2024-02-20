# Shopify GTM Pixel
A comprehensive Google Tag Manager pixel for Shopify to track Google Analytics and Google Ads ecommerce events

## Introduction

This is an alternative to using the Shopify built-in Google & YouTube Channel to send Google Analytics 4 and Google Ads events.

This pixel for Shopify will feed Google Analytics 4 and Google Ads compatible ecommerce data to Google Tag Manager.

Note I still use Shopify's Google & YouTube Channel to connect to Merchant Center, but leave the Google Analytics 4 and Google Ads connections disabled as I could never get them to to work satisfactorily.

Updates and suggestions most welcome!

## Installation

### Shopify backend:

1. Create a new Custom Pixel.
2. Copy and paste the code in to the pixel.
3. Replace '&lt;your tag here&gt;' with your GTM tag id.
4. Save and connect the pixel.

### Google Tag Manager

#### Variables

| Variable Name             | Data Layer Variable Name | Type                |
| ------------------------- | ------------------------ | ------------------- |
| Ecommerce Coupon          | ecommerce.coupon         | Data Layer Variable |
| Ecommerce Currency        | ecommerce.currency       | Data Layer Variable |
| Ecommerce Items           | ecommerce.items          | Data Layer Variable |
| Ecommerce Shipping        | ecommerce.shipping       | Data Layer Variable |
| Ecommerce Tax             | ecommerce.tax            | Data Layer Variable |
| Ecommerce Transaction ID  | ecommerce.transaction_id | Data Layer Variable |
| Ecommerce Value           | ecommerce.value          | Data Layer Variable |
| Ecommerce Item List ID    | ecommerce.item_list_id   | Data Layer Variable |
| Ecommerce Item List Name  | ecommerce.item_list_name | Data Layer Variable |
| Event ID                  | id                       | Data Layer Variable |

#### Triggers

| Trigger Name              | Event Name               | Trigger Type | Fires On          |
| ------------------------- | ------------------------ | ------------ | ----------------- |
| view_item                 | view_item                | Custom Event | All Custom Events |
| add_to_cart               | add_to_cart              | Custom Event | All Custom Events |
| begin_checkout            | begin_checkout           | Custom Event | All Custom Events |
| purchase                  | purchase                 | Custom Event | All Custom Events |
| view_cart                 | view_cart                | Custom Event | All Custom Events |
| view_item_list            | view_item_list           | Custom Event | All Custom Events |

#### Google Analytics GA4 Event Tags

| Name                 | Event Name     | Event Parameters                              | Firing Triggers |
| -------------------- | -------------- | --------------------------------------------- | --------------- |
| GA4 - view_item      | view_item      | currency = {{Ecommerce Currency}}             | view_item       |
|                      |                | value = {{Ecommerce Value}}                   |                 |
|                      |                | items = {{Ecommerce Items}}                   |                 |
| GA4 - add_to_cart    | add_to_cart    | currency = {{Ecommerce Currency}}             | add_to_cart     |
|                      |                | value = {{Ecommerce Value}}                   |                 |
|                      |                | items = {{Ecommerce Items}}                   |                 |
| GA4 - begin_checkout | begin_checkout | currency = {{Ecommerce Currency}}             | begin_checkout  |
|                      |                | value = {{Ecommerce Value}}                   |                 |
|                      |                | items = {{Ecommerce Items}}                   |                 |
|                      |                | coupon = {{Ecommerce Coupon}}                 |                 |
| GA4 - purchase       | purchase       | items = {{Ecommerce Items}}                   | purchase        |
|                      |                | transaction_id = {{Ecommerce Transaction ID}} |                 |
|                      |                | value = {{Ecommerce Value}}                   |                 |
|                      |                | tax = {{Ecommerce Tax}}                       |                 |
|                      |                | shipping = {{Ecommerce Shipping}}             |                 |
|                      |                | currency = {{Ecommerce Currency}}             |                 |
|                      |                | coupon = {{Ecommerce Coupon}}                 |                 |
| GA4 - view_cart      | view_cart      | currency = {{Ecommerce Currency}}             | view_cart       |
|                      |                | value = {{Ecommerce Value}}                   |                 |
|                      |                | items = {{Ecommerce Items}}                   |                 |
| GA4 - view_item_list | view_item_list | item_list_id = {{Ecommerce Item List ID}}     | view_item_list  |
|                      |                | item_list_name = {{Ecommerce Item List Name}} |                 |
|                      |                | items = {{Ecommerce Items}}                   |                 |

#### Google Ads Conversion Tracking Tags

| Name                 | Conversion Value    | Transaction ID               | Currency Code          | Firing Triggers |
| -------------------- | ------------------- | ---------------------------- | ---------------------- | --------------- |
| Ads - view_item      | {{Ecommerce Value}} | {{Event ID}}                 | {{Ecommerce Currency}} | view_item       |
| Ads - add_to_cart    | {{Ecommerce Value}} | {{Event ID}}                 | {{Ecommerce Currency}} | add_to_cart     |
| Ads - begin_checkout | {{Ecommerce Value}} | {{Event ID}}                 | {{Ecommerce Currency}} | begin_checkout  |
| Ads - purchase       | {{Ecommerce Value}} | {{Ecommerce Transaction ID}} | {{Ecommerce Currency}} | purchase        |

#### Other Tags

| Name                   | Type                   | Firing Triggers |
| ---------------------- | ---------------------- | --------------- |
| Google Analytics 4     | Google Tag             | All Pages       |
| Google Ads             | Google Tag             | All Pages       |
| Conversion Linker      | Conversion Linker      | All Pages       |
| Google Ads Remarketing | Google Ads Remarketing | All Pages       |
