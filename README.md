# denops-open-http.vim

When a buffer starting with http or https is opened, fetch is performed and the contents are expanded into the buffer.

This plugin depends on [denops.vim](https://github.com/vim-denops/denops.vim).

## Installation

### Required

- [denops.vim](https://github.com/vim-denops/denops.vim)

## Usage

### Open URL

```vim
" Raw URL
:e https://raw.githubusercontent.com/yuki-yano/denops-open-http/main/denops/open-http/main.ts

" Use GitHub URL
:e https://github.com/yuki-yano/denops-open-http.vim/blob/main/denops/open-http/main.ts
```

### Open from browser for GitHub

```vim
:OpenHttpGitHubServerStart
```

Intall [Tampermonkey](https://chrome.google.com/webstore/detail/tampermonkey/dhdgffkkebhmkfjojejmpbldmpobfkfo?hl=ja) and [open_github](https://raw.githubusercontent.com/yuki-yano/denops-open-http.vim/main/user_script/open_github.user.js)

Click "Open Vim" button.

![open_vim](https://user-images.githubusercontent.com/5423775/216571047-5147d6e9-c731-427b-b773-47f32b6f5a2a.png)
