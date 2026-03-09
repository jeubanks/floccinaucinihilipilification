+++
title = "Fun with Github Actions"
date = "2026-03-08"
description = "The new site/blog I'm playing with is using Zola.  I don't like heavy CMS with database requirements.  Now to the adventures of setting up Github actions to deploy the site."

[taxonomies]
tags = ["github"]
+++

### First steps - Setup secrets
Basics are needed for how to connect to the remote site.  I'll add the following into a Github Environment -> Secrets

- SSH_USER
- SSH_PRIVATE_KEY
- SSH_HOST
- TARGET_DIR

Next in Github -> Actions I'll create a new workflow and not use any template just start from scratch and paste the following:

### main.yml
```
name: Build and Deploy Zola

on:
  push:
    branches:
      - main  # Set this to your main branch

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout Repository
        uses: actions/checkout@v4
        with:
          submodules: true  # Necessary if your Zola theme is a submodule

      - name: Install Zola
        run: |
          sudo snap install --edge zola
          zola build

      - name: SCP Transfer Files
        uses: appleboy/scp-action@v0.1.7
        with:
          host: ${{ secrets.SSH_HOST }}
          username: ${{ secrets.SSH_USER }}
          key: ${{ secrets.SSH_PRIVATE_KEY }}
          source: "public/*"
          target: ${{ secrets.TARGET_DIR }}
          strip_components: 1  # Removes "public/" from the path during copy
          overwrite: true
```
Now to fire this off and see what's broken.

- Run one was a fail with authentication issues.  Take two....