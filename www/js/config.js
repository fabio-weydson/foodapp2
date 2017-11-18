/*global app */
'use strict';
app
.constant('appConfig', {
  titulo: 'EasyResto',
  //apiEndPoint: 'http://ec2-52-21-107-249.compute-1.amazonaws.com/rococo/public/api/v1/',
  apiEndPoint: 'http://easyresto.esy.es/api2/',
  imgroot : 'http://easyresto.esy.es/assets/media',
  facebookPage : 'EasyResto',
  dataServiceError: 'Algum erro aconteceu.',
  admob: {
    android: {
      banner: 'ca-app-pub-1605099908936240/4396968417',
      interstitial: 'ca-app-pub-1605099908936240/5873701618'
    },
    ios: {
      banner: 'ca-app-pub-1605099908936240/8827168010',
      interstitial: 'ca-app-pub-1605099908936240/1303901216'
    },
    browser: {
      banner: 'ca-app-pub-1605099908936240/4257367612',
      interstitial: 'ca-app-pub-1605099908936240/5734100814'
    }
  }
})
.value('curSymbol', {
	symbol: 'R$',
  symbol2: 'R$',
  estabelecimento: 'App'
});
