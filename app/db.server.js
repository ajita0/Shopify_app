import { CustomerClient } from "@customer/client";

const customer = global.customer || new CustomerClient();

if (process.env.NODE_ENV !== "production") {
  if (!global.customer) {
    global.customer = new CustomerClient();
  }
}

export default customer;
