<!--
INSTRUCTION: Summary: The blank component contains the following two parts:
INSTRUCTION: - To the left: There is an empty div with text on top and bottom.
INSTRUCTION: - To the right: There is an empty div.
INSTRUCTION:
INSTRUCTION: If the user asks you to insert components left and right of each other, first wrap them into `<div class="grid"> </div>` and then use the following syntax:
INSTRUCTION: <div class="grid">
INSTRUCTION:     <!-- these components appear to the left side -->
INSTRUCTION:     <div id="left-side-container" class="flex"> Left side part here </div>
INSTRUCTION:
INSTRUCTION:     <!-- these components appear to the right side -->
INSTRUCTION:     <div id="right-side-container" class="flex"> Right side part here</div>
INSTRUCTION: </div>
-->
<template>
    <div>
        <link href='https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css' rel='stylesheet'>
        <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet">
        <section id="blank-section" class="bg-gradient-to-br from-purple-900 via-pink-800 to-black flex-1">
            <div id="blank-container" class="max-w-screen-xl px-4 pt-20 pb-8 mx-auto lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12 lg:pt-28">
                <div class="bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg rounded-lg shadow-lg p-8 text-white">
                    <h2 class="text-3xl font-bold mb-4">Futuristic Landscape</h2>
                    <p class="mb-6">Explore the surreal, ethereal world with vibrant pink and purple hues.</p>
                    <div class="grid grid-cols-2 gap-4">
                        <div class="bg-pink-500 bg-opacity-30 p-4 rounded-lg">
                            <i class='bx bx-planet text-4xl mb-2'></i>
                            <h3 class="text-xl font-semibold mb-2">Illuminated Planet</h3>
                            <p>Discover the rocky terrain and reflective waters of our dreamlike world.</p>
                        </div>
                        <div class="bg-purple-500 bg-opacity-30 p-4 rounded-lg">
                            <i class='bx bx-landscape text-4xl mb-2'></i>
                            <h3 class="text-xl font-semibold mb-2">Otherworldly Scenery</h3>
                            <p>Immerse yourself in the dramatic and ethereal atmosphere of our futuristic landscape.</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>  
    </div>
</template>

<script>
export default {
    name: "BlankComponent",
    data() {
        return {
            expanded: false,
            tab: null,
        };
    },
};
</script>

<style scoped>
/* Add component-specific styles here */
</style>
