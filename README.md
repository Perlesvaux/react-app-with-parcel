# Host your React App on Github Pages with Parcel!

## Step by step

Globally install Parcel (recommended)

```bash
npm install parcel -g
```

Don't have a project yet? Set it up with this one-liner
```bash
mkdir YOUR_PROJECT && cd YOUR_PROJECT && npm init
```

cd into your project and add these scripts below to your **package.json**
- With npm:
```bash
npm pkg set 'scripts.predeploy'='rm -rf dist && rm -rf .parcel-cache/ &&  parcel build ./*.html --public-url ./' && npm pkg set 'scripts.deploy'='gh-pages -d dist' && npm pkg set 'scripts.start'='parcel ./*.html'
```

Install this dependency!
```bash
npm install --save-dev gh-pages
```

If you didn't install Parcel globally, add it as a dependency to your project.
```
npm install --save-dev parcel
```

Time to deploy! (Create new repository [here](https://github.com/new))
```bash
npm run deploy
```

## React app in one line!
```bash
curl -o - https://raw.githubusercontent.com/Perlesvaux/react-app-with-parcel/main/react_boilerplate | bash -s -- PARCEL_PROJECT
```

# Requirements:
**Node**
```bash
# Installing Node and npm through nvm:
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.5/install.sh | bash
nvm install 18
nvm use 18
```
