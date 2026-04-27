const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

module.exports = function homepageDataPlugin(context, options) {
  return {
    name: 'recent-blog-posts',
    async contentLoaded({actions}) {
      const {setGlobalData} = actions;

      // Recent blog posts
      const blogDir = path.join(context.siteDir, 'blog');
      const posts = [];

      const entries = fs.readdirSync(blogDir, {withFileTypes: true});
      for (const entry of entries) {
        let filePath;
        if (entry.isDirectory()) {
          const indexFile = ['index.mdx', 'index.md']
            .map(f => path.join(blogDir, entry.name, f))
            .find(f => fs.existsSync(f));
          if (!indexFile) continue;
          filePath = indexFile;
        } else if (entry.name.endsWith('.mdx') || entry.name.endsWith('.md')) {
          if (entry.name === 'authors.yml' || entry.name === 'tags.yml') continue;
          filePath = path.join(blogDir, entry.name);
        } else {
          continue;
        }

        const raw = fs.readFileSync(filePath, 'utf-8');
        const {data} = matter(raw);
        if (!data.title) continue;

        let date = data.date;
        if (!date) {
          const match = entry.name.match(/^(\d{4}-\d{2}-\d{2})/);
          if (match) date = match[1];
        }

        posts.push({
          title: data.title,
          date: date ? new Date(date).toISOString().split('T')[0] : null,
          slug: data.slug || entry.name.replace(/^\d{4}-\d{2}-\d{2}-/, ''),
        });
      }

      posts.sort((a, b) => (b.date || '').localeCompare(a.date || ''));

      // Projects
      const projectsFile = path.join(context.siteDir, 'data', 'projects.json');
      const projects = JSON.parse(fs.readFileSync(projectsFile, 'utf-8'));

      setGlobalData({
        recentPosts: posts.slice(0, 5),
        projects,
      });
    },
  };
};
