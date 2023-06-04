export const defaultAppConfigs = {

    // DEFINE YOUR URL
    'rootUrl': 'https://technoloplus.com/wp-json/wp/v2/',
  
    // enableExcludeFromMenu SET TO true TO ENABLE excudeFromMenu
    //if want to exclude from menu your category set value FALSE
    //all category enter with lower case
  
    // SOCIAL NETWORK
    'socialLink': {
      'facebook': 'https://www.facebook.com',
      'twitter': 'https://twitter.com',
      'youtube': 'https://www.youtube.com/',
      'instagram': 'https://www.instagram.com'
    },
  
  
    // SHOW ALL YOUR CATEGORIES ( TRUE - display all category )
    'isExcludeCategoryEnabled': true,
  
    'excludeFromMenu': {
      // 'travel': true,
    },
  
    'includeFromMenu': {
      //'travel': true
    },
  
  
    // INTRO PAGE IN APP ( TRUE - slider is enable)
    'introData': false,
  
    // SETTINGS PARAMS fOR ONE SIGNAL
    'oneSignal': {
      "appID": "83db8e6c-0b1c-4a99-880a-7700e94dad3a",
      "googleProjectId": "827631053705"
    },
  
  
    // ENABLE OR DISABLE PUSH NOTIFICATION
    'defaultValueForPushNotification': true,
  
  
    // SETTINGS DEFAUTL COLOR COMBINATION
    'colorTheme': 'blue-themes',
  
  
    // SETTINGS RTL ( FALSE - is not set rtl default  )
    'defualtValueForRTL': false,
  
  
    // SETTINGS FEATURES POTS TO SLIDER (FALSE - slider is enable)
    'isFeaturesPostsGetFromSticky': false,
  
  
    // SLIDER NUMBER BUT IT IS NOT STICKY ( isFeaturesPostsGetFromSticky:FALSE)
    'numberOfItemForSlider': 3,
  
    // SETTINGS NUMBER POSTS ON CATEGORY
    'numberOfItemPerPage': 30,
  
    'isCacheCategoryEnabled': false,  
    'cacheExpiredTime': 24 * 60 * 60 * 1000, //24H
    
  
      
    //ADS
    'bannerAds': {
      'enable': true,
      'config': {
        'id': '',
        'isTesting': true,
        'autoShow': true
      }
    },
  
    // How to set time open ADS page
    'interstitialAds': {
      'showAdsAfterXPosts': 10,
      'enable': true,
      'config': {
        'id': '',
        'isTesting': true,
        'autoShow': true
      }
    }
  }