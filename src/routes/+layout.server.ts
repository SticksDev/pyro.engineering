import { getAllPostsText } from "$lib/server/util.js";
import { convertToText } from "$lib/util";

export async function load({ request }) {
	const textPosts = await getAllPostsText();
	const htmlTextPosts = textPosts.map((post) => ({
		...post,
		code: convertToText(post.code),
	}));
	const ua = request.headers.get("user-agent");
	return {
		ua,
		htmlTextPosts,
	};
}
