<script lang="ts">
	import PostPreview from "$lib/components/landing/PostPreview.svelte";
	import QuestionMarkCircleIcon from "virtual:icons/heroicons-solid/question-mark-circle";
	import { searchValue } from "$lib/store";
	import clsx from "clsx";
	import type { PageData } from "./$types";

	export let data: PageData;

	$searchValue = data.query || "";
</script>

<h1 class="p-4 px-6 text-4xl font-bold">
	{data.query || "All posts"} ({data.posts.length})
</h1>

{#each data.posts as post, i}
	<div
		class={clsx("w-full border-dashed border-neutral-800", {
			"border-b": i !== data.posts.length - 1,
			"border-t": i === 0,
		})}
	>
		<PostPreview half={false} large={false} post={post.metadata} />
	</div>
{/each}

{#if data.posts.length === 0}
	<div class="flex flex-col items-center justify-center p-8">
		<QuestionMarkCircleIcon class="h-16 w-16 text-neutral-500" />
		<p class="mt-4 text-center text-lg text-neutral-500">
			No posts found for "{data.query}". Try searching for something else.
		</p>
	</div>
{/if}
