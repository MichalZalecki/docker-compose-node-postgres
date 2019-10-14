import * as request from "request-promise";

request.get("http://app:3000/ping")
.then(() => {
  console.log("UP")
  process.exit(0)
})
.catch((err: Error) => {
  console.log(err)
  console.log("DOWN")
  process.exit(1)
})
