module.exports = {
 entry: {
   main: './lib/index.js',
 },
 output: {
   path: __dirname,
   filename: 'views/[name].bundle.js'
 },
 module: {
   loaders: [
     { test: /\.js$/, exclude: '/node_modules/', loader: 'babel-loader', query: { presets: ['es2015'] } },
     { test: /\.css$/, loader: 'style!css' },
     { test: /\.scss$/, loader: 'style!css!sass' }
   ]
 },
 resolve: {
   extensions: ['', '.js', '.json', '.scss', '.css']
 }
};
