export default function (eleventyConfig) {
  eleventyConfig.ignores.add("**/SKILL.md");

  return {
    dir: {
      input: "src",
      output: "_site",
      includes: "_includes",
      layouts: "_includes/layouts",
    },
    markdownTemplateEngine: "liquid",
    htmlTemplateEngine: "liquid",
  };
}
