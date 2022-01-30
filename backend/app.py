# Simple Fastapi server
from fastapi import FastAPI, Request

app = FastAPI()


@app.get("/")
async def ping():
    return {"message": "pong"}


# simple post request api
@app.post("/")
async def post_request(request: Request):
    response = await request.json()
    print(f"Raw response: {response}")

    message = response.get("secret", "0")
    if message == "secret":
        print("Secret message received")
        return {"message": "yes"}
    else:
        print("No secret message received")
        return {"message": "no"}
