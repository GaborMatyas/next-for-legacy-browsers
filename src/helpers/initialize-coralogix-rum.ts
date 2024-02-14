import { CoralogixLogSeverity } from '@coralogix/browser/src/types-external';

const getUserPID = async () => 'randomUserID'

export const initializeCoralogixRUM = async () => {
    try {
        const { CoralogixRum } = await import('@coralogix/browser');

        // eslint-disable-next-line no-console
        console.log('🚀 ~ initializeCoralogixRUM ~ coralogixRum:', CoralogixRum);

        if (!CoralogixRum) {
            // eslint-disable-next-line no-console
            console.info('Coralogix Real User Monitoring can not be imported');
            return;
        }

        const userPid = await getUserPID();
        // eslint-disable-next-line no-console

        CoralogixRum.init({
            public_key: 'this_is_not_our_real_user_key', // insert your valid public key here
            application: 'HotstarX-WebLR',
            version: '0.0.1',
            coralogixDomain: 'EU1'
        });

        CoralogixRum.setUserContext({
            user_id: userPid || 'undefined',
            user_name: '',
            // user_name: 'web-lr-poc-test',
            user_metadata: {
                appId: 'this_is_our_test_app_id_for_minified_nextjs_project',
            }
        });

        CoralogixRum.setLabels({
            test: 'CoralogixRum Debugging from 2024.02.14. in mini NextJS project'
        });

        // eslint-disable-next-line no-console
        console.log("🚀 ~ I tried to execute CoralogixRum.error function. Check the network tab if this worked or not")
        CoralogixRum.error('this is an error that was sent manually during RUM POC', {
            key: 'the first test error'
        });



        for (let index = 0; index < 5; index++) {
            // eslint-disable-next-line no-console
            console.log("🚀 ~ I tried to execute CoralogixRum.log function and send logs multiple times. The number of tries:", index)
            CoralogixRum.log(
                CoralogixLogSeverity.Error,
                'this is a log that was sent manually during RUM poc',
                {
                    key: 'the first test log'
                }
            );
        }
        // eslint-disable-next-line no-console
        console.log("🚀 ~ Check the network tab if this worked or not")
    } catch (error) {
        // eslint-disable-next-line no-console
        console.error('The following error occurred while initializing CoralogixRum:', error);
    }
};
