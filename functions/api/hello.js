// This function handles requests to /api/hello
export function onRequestGet() {
	const data = { message: "Hello from your new API!" };

	// Return a JSON response
	return new Response(JSON.stringify(data), {
		headers: { "Content-Type": "application/json" },
	});
}
