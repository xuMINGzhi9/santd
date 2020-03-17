npm install
npm run release
git add dest
git commit -m 'deloy'
current_git_branch_latest_id=`git rev-parse HEAD`
git checkout -b cus_release --track origin/cus_release
git cherry-pick $current_git_branch_latest_id
git push --set-upstream origin cus_release
git checkout c_release