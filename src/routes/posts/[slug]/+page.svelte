<script lang="ts">
	import AuthorAvatars from "$lib/components/AuthorAvatars.svelte";
	import { toSlug } from "$lib/util";
	import type { PageData } from "./$types";
	import opengraphBg from "$lib/assets/opengraph_image__2_.png";

	export let data: PageData;

	const convertDate = (date: Date) => {
		const day = date.toLocaleString("default", { weekday: "short" });
		const month = date.toLocaleString("default", { month: "long" });
		const dayNum = date.getDate();
		const year = date.getFullYear();
		return `${day}, ${month} ${dayNum}, ${year}`;
	};
</script>

<svelte:head>
	<title
		>{data.post
			? `${data.post.metadata.title} // Pyro Engineering`
			: "Not found // Pyro Engineering"}</title
	>
	{#if data.post}
		{@const description = (
			data.htmlTextPosts.find(
				(p) =>
					p.metadata.title === (data.post || { metadata: { title: "" } }).metadata.title,
			) || { code: "" }
		).code
			.split("\n")[0]
			.trim()}
		{@const shortenedDesc =
			description.length > 160 ? `${description.slice(0, 160)}...` : description}
		<meta name="description" content={shortenedDesc} />
		<meta name="twitter:card" content="summary_large_image" />
		<meta property="og:title" content="{data.post.metadata.title} // Pyro Engineering" />
		<meta property="og:description" content={shortenedDesc} />
		<meta property="og:image" content={data.post.metadata.image} />
		<meta
			property="og:url"
			content="https://pyro.engineering/posts/{toSlug(data.post.metadata.title)}"
		/>
		<meta property="og:type" content="website" />
		<meta name="theme-color" content="#ff4438" />
	{:else}
		<meta property="og:image" content={opengraphBg} />
		<meta property="og:url" content="https://pyro.engineering" />
		<meta property="og:type" content="website" />
		<meta name="theme-color" content="#ff4438" />
	{/if}
</svelte:head>

<div class="mx-auto max-w-4xl px-4 py-8">
	{#if data.post}
		{@const formattedDate = convertDate(new Date(data.post.metadata.date))}
		<h1 class="mb-6 text-4xl font-bold md:text-5xl md:leading-[120%]">
			{data.post.metadata.title}
		</h1>
		<div class="my-6 border-b border-neutral-700"></div>
		<div class="mb-6 flex flex-wrap items-center gap-4">
			<div class="flex items-center gap-2">
				{#if data.post.metadata.authors.length === 1}
					<time class="mr-3 font-medium text-neutral-400">{formattedDate}</time>
					<div class="mr-3 hidden h-4 w-px bg-neutral-700 sm:block"></div>
					<a
						class="flex items-center gap-2.5 hover:underline"
						href="/author/{toSlug(data.post.metadata.authors[0].name)}"
					>
						<img
							src={data.post.metadata.authors[0].image}
							alt={data.post.metadata.authors[0].name}
							class="h-8 w-8 rounded-full object-cover"
							width="32"
							height="32"
						/>
						<div class="max-w-[200px] truncate text-neutral-400">
							{data.post.metadata.authors[0].name}
						</div>
					</a>
				{:else}
					<div class="flex flex-wrap items-center gap-4">
						<time class="font-medium text-neutral-400">{formattedDate}</time>
						<div class="hidden h-4 w-px bg-neutral-700 sm:block"></div>
						<AuthorAvatars authors={data.post.metadata.authors} />
					</div>
				{/if}
			</div>
		</div>
		<img
			src={data.post.metadata.image}
			alt="Post"
			class="mb-8 h-64 w-full rounded-lg object-cover"
		/>
		<article id="article" class="prose prose-invert max-w-none">
			<svelte:component this={data.post.default} />
		</article>
	{:else}
		<div class="py-16 text-center">
			<h1 class="mb-4 text-4xl font-bold">Post not found</h1>
			<p class="text-neutral-400">The requested post could not be found.</p>
		</div>
	{/if}
</div>
