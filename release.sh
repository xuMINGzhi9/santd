current_git_branch_pre_id=`git rev-parse HEAD`
npm install
npm run release
git add dest
git commit -m 'deloy'
current_git_branch_latest_id=`git rev-parse HEAD`
git cherry-pick $current_git_branch_latest_id
git push origin tempbranch:refs/for/cus_release
git checkout c_release
git reset current_git_branch_pre_id --hard
git branch -d tempbranch