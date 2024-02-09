<h1 align="center">🔱</h1>
<h3 align="center">branch-name-action</h3>

<p align="center">
    Check if the branch name is following a convention name
</p>

## Usage

You can create a `.github/workflows/branch-name.yml` file:

```yaml
name: Branch Name
on:
  pull_request:
    types: [opened]
jobs:
  branch_name:
    runs-on: ubuntu-latest
    name: Branch Name
    steps:
      - uses: AlbertHernandez/branch-name-action@v1
        with:
          branch_pattern: 'feature|bug|chore|hotfix'
          comment_for_invalid_branch_name: 'Ups! This branch name is not following the standards! You can see them here: https://github.com/AlbertHernandez'
          fail_if_invalid_branch_name: 'true'
          ignore_branch_pattern: 'master|beta'
    env:
      GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
```

## Inputs

| Name | Description | Required | Default Value |
|------|-------------|----------|---------------|
| branch_pattern | Pattern that should follow the names of the branches | true | |
| comment_for_invalid_branch_name | Comment that will be written if the branch name does not follow the branch pattern | false | The name of this branch is not \n following the standards of this project! |
| fail_if_invalid_branch_name | If its true the the action will fail if the branch does not follow the branch pattern | false | false |
| ignore_branch_pattern | Pattern of the branches names where this action will be no executed | false | |