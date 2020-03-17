rm -rf dest
git add dest
git commit -m 'delete dest'
current_git_branch_pre_id=`git rev-parse HEAD`
npm install
npm run release
git add dest
git commit -m 'deloy'
current_git_branch_latest_id=`git rev-parse HEAD`
git branch -D tempbranch
git checkout -b tempbranch -f --track origin/cus_release
git cherry-pick $current_git_branch_latest_id
mv dest/* ./
rm -rf dest
git add lib
git add dist
git add es
git add package.json
git add README.md
git commit -m 'deloy'
git push origin HEAD:cus_release
git checkout c_release -f
git reset $current_git_branch_pre_id --hard
git branch -D tempbranch