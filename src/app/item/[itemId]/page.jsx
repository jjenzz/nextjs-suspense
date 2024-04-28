import { headers } from "next/headers";
import { cache } from "react";
import * as React from "react";

const items = [
	{ id: "1", name: "item-one", detail: "some detail for item one" },
	{ id: "2", name: "item-two", detail: "some detail for item two" },
	{ id: "3", name: "item-three", detail: "some detail for item three" },
	{ id: "4", name: "item-four", detail: "some detail for item four" },
	{ id: "5", name: "item-five", detail: "some detail for item five" },
];

const getData = cache(async (id) => {
	return new Promise((resolve) => {
		setTimeout(() => {
			resolve({ data: items.find((item) => item.id === id) });
		}, 500);
	});
});

function isSSRLoad() {
	return Boolean(headers().get("accept")?.includes("text/html"));
}

export default async function Item({ params }) {
	return isSSRLoad() ? (
		<Content params={params} />
	) : (
		<React.Suspense fallback={<p>Loading...</p>}>
			<Content params={params} />
		</React.Suspense>
	);
}

async function Content({ params }) {
	const response = await getData(params.itemId);
	return (
		<div>
			<h1>{response.data.name}</h1>
			<p>{response.data.detail}</p>
		</div>
	);
}
