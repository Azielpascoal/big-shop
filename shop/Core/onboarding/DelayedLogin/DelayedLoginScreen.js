import React from 'react';
import WelcomeScreen from '../WelcomeScreen/WelcomeScreen';

export default function DelayedLoginScreen(props) {
    
    const appConfig = props.route.params.appConfig;
    const authManager = props.route.params.authManager;
    const appStyles = props.route.params.appStyles;

    return(
        <WelcomeScreen 
            authManager={authManager}
            navigation={props.navigation}
            appStyles={appStyles}
            appConfig={appConfig}
            title={appConfig.onboardingConfig.delayedLoginTitle} 
            caption={appConfig.onboardingConfig.delayedLoginCaption}
            delayedMode={true} 
        />
    )
}