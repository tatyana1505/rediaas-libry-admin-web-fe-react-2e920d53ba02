# Products

If a product has to override the default global settings for a customer, it should store the data under \_\_PRODUCT_REF\_\_/settings/\_\_SCHEMA_REFERENCE_NAME\_\_

E.g. If we wanted to override the data stored under \_\_CUSTOMER_REF\_\_/globalSettings/searchEngine (schema found at /schema/searchEngine), the data that overrides the global settings should be stored under \_\_PRODUCT_REF\_\_/settings/searchEngine

## Butler

The content schema for the Butler product are found on the path /schemas/butler in firestore.

### Unit's

Each unit data are to be stored in the collection \_\_PRODUCT_REF\_\_/units, let firestore create the document id.

The content schema for a Butler unit are found on the path /schemas/butlerUnit in firestore.