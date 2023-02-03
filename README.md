# denops-open-http.vim

When a buffer starting with http or https is opened, fetch is performed and the contents are expanded into the buffer.

This plugin depends on [denops.vim](https://github.com/vim-denops/denops.vim).

## Installation

### Required

- [denops.vim](https://github.com/vim-denops/denops.vim)

## Open URL

```vim
" Raw URL
:e https://raw.githubusercontent.com/yuki-yano/denops-open-http/main/denops/open-http/main.ts

" Use GitHub URL
:e https://github.com/yuki-yano/denops-open-http.vim/blob/main/denops/open-http/main.ts
```

## Open from browser for GitHub

### Demo

https://user-images.githubusercontent.com/5423775/216580122-bcfc5279-2cd7-44cd-b420-926d3da222a3.mp4

### Usage

```vim
:OpenHttpGitHubServerStart
```

Intall [Tampermonkey](https://chrome.google.com/webstore/detail/tampermonkey/dhdgffkkebhmkfjojejmpbldmpobfkfo?hl=ja) and [open_github user_script](https://raw.githubusercontent.com/yuki-yano/denops-open-http.vim/main/user_script/open_github.user.js)

Click "Open Vim" button.

![open_vim](https://user-images.githubusercontent.com/5423775/216571047-5147d6e9-c731-427b-b773-47f32b6f5a2a.png)
