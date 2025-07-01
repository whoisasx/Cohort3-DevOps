import { Hono } from "hono";

const app = new Hono();

app.get("/", (c) => {
	return c.text("hello hono!");
});

app.get("/api/v1/signup", (c) => {
	return c.json(
		{
			message: "this is sign up page.",
		},
		201,
		{
			token: "adilshaikh",
		}
	);
});
app.get("/api/v1/signin", (c) => {
	return c.json(
		{
			message: "this is sign in page.",
		},
		200,
		{
			token: "adilshaikh",
		}
	);
});
app.post("/api/v1/todo", (c) => {
	return c.json(
		{
			message: "this is post todo page.",
		},
		201,
		{
			token: "adilshaikh",
		}
	);
});
app.get("/api/v1/todo", (c) => {
	return c.json(
		{
			message: "this is get todo page.",
		},
		200,
		{
			token: "adilshaikh",
		}
	);
});

export default app;
