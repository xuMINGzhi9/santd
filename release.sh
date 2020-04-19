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
git reset
git pull
git cherry-pick $current_git_branch_latest_id
cd dest
tar cvzf app.tar.gz dist es lib * 
mv app.tar.gz ../
cd ..
tar xzf app.tar.gz
rm -rf dest
rm -r app.tar.gz
git add lib
git add dist
git add es
git add package.json
git add README.md
git rm -r --cached dest
git commit -m 'deloy' --no-verify
git push origin HEAD:cus_release
git checkout c_release -f
git reset $current_git_branch_pre_id --hard
git branch -D tempbranch