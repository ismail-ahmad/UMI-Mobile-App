import { useAuth } from '@/components/authContext';
import Button from '@/components/button';
import FormContainer from '@/components/form_container';
import FormFieldContainer from '@/components/form_field_container';
import Heading from '@/components/heading';
import MainWrapper from '@/components/main_wrapper';
import { useNetworkErrors } from '@/components/network_errors';
import TextInputField from '@/components/text_input_field';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Alert } from 'react-native';


export default function AddClient(){
    const [clientName, setClientName] = useState<string>('');
    const [id, setId] = useState<string>('');
    const { apiCall } = useAuth();
    const { setFailedRequest } = useNetworkErrors();
    const router = useRouter();
    const url = 'https://concept-server-production.up.railway.app/add_new_client';
    return(
        <MainWrapper>
            <Heading text='Add Client' />
            <FormContainer>
                <FormFieldContainer>
                    <TextInputField placeHolder='Client Name' value={clientName} onChangeText={(clientName) => {setClientName(clientName);}}></TextInputField>
                </FormFieldContainer>
                <FormFieldContainer>
                    <TextInputField placeHolder='Client ID' value={id} onChangeText={(id) => {setId(id);}}></TextInputField>
                </FormFieldContainer>
                <FormFieldContainer>
                    <Button text="Add" onPressFunction={async() => {
                        if(id !== '' && clientName !== ''){
                            try{
                                const res = await apiCall(url, {
                            method:'POST',
                            headers: {
                                'Content-Type': 'application/JSON'
                            },
                            body: JSON.stringify({clientName: clientName, id: id})
                            });
                            if(res.ok){
                                setClientName('');
                                setId('');
                                Alert.alert('Operation Successful!', `Client: ${clientName} \nID: ${id}\nhas been saved!`);

                            } else {
                                //handle any errors that occurs due to failed request!
                                console.log(res);
                            }
                            } catch(err){
                                setFailedRequest(url);
                                router.push('/request_timeout');
                            }
                        } else if(clientName === '') {
                            Alert.alert('Empty Client', 'Please use valid Name for new client');
                        } else if(id === '') {
                            Alert.alert('Empty ID', 'Please use valid ID for new client');
                        }
                    }} style={{marginTop: 32}}></Button>
                </FormFieldContainer>
            </FormContainer>
        </MainWrapper>
    );
}