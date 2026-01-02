import { useAuth } from '@/components/authContext';
import Button from '@/components/button';
import FormContainer from '@/components/form_container';
import FormFieldContainer from '@/components/form_field_container';
import Heading from '@/components/heading';
import MainWrapper from '@/components/main_wrapper';
import { useNetworkErrors } from '@/components/network_errors';
import TextInputField from '@/components/text_input_field';
import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import DropDown from 'react-native-dropdown-picker';
// import { Alert } from 'react-native';


export default function AddUser(){
    const { apiCall } = useAuth();
    const { setFailedRequest } = useNetworkErrors();
    const router = useRouter();
    const url = 'https://concept-server-production.up.railway.app/add_user';
    const [name, setName] = useState<string>('');
    const [workId, setWorkId] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [companyValues, setCompanyValues] = useState<string|null> (null);
    const [companyOpen, setCompanyOpen] = useState<boolean> (false);
    const [companyItems, setCompanyItems] = useState<{label: string; value: string | number}[]>([]);
    useEffect(() => {
        async function loadCompany(){
        console.log('making db req...');
        const res = await apiCall(url, {method: 'POST', headers: {'Content-Type': 'application/json'} , body:JSON.stringify({getCompany: true})});
    if(!res?.ok){
        console.log(res);
        console.log('res not ok!');
        setCompanyItems([]);
        return
    } 
    const companyItems:{label: string; value: string | number}[] = res.data.map((data: Record<string, string | number>) => {
        return {label: data.client_name, value: data.id }
    });
    setCompanyItems(companyItems);
    }
    loadCompany();
    }
    , []);
    return(
        <MainWrapper>
            <Heading text='Add User' />
            <FormContainer>
                <FormFieldContainer>
                    <TextInputField placeHolder='Name' value={name} onChangeText={(name) => {setName(name)}}></TextInputField>
                </FormFieldContainer>
                <FormFieldContainer>
                    <TextInputField placeHolder='Work ID' value={workId} onChangeText={(workId) => {setWorkId(workId)}}></TextInputField>
                </FormFieldContainer>
                <FormFieldContainer>
                    <TextInputField placeHolder='Email' value={email} onChangeText={(email) => {setEmail(email)}}></TextInputField>
                </FormFieldContainer>


                    <DropDown 
                      open={companyOpen}
                      value={companyValues}
                      items={companyItems}
                      setOpen={setCompanyOpen}
                      setValue={setCompanyValues}
                      setItems={setCompanyItems}
                      multiple={false}
                    />

                
                {/* <FormFieldContainer>
                    <TextInputField placeHolder='Company' value={email} onChangeText={(email) => {setEmail(email)}}></TextInputField>
                </FormFieldContainer> */}


                <FormFieldContainer>
                    <TextInputField placeHolder='Role' value={''} onChangeText={() => {}}></TextInputField>
                </FormFieldContainer>
                <FormFieldContainer>
                    <TextInputField placeHolder='Access' value={''} onChangeText={() => {}}></TextInputField>
                </FormFieldContainer>
                <FormFieldContainer>
                    <Button text="Add" onPressFunction={async() => {}} style={{marginTop: 32}}></Button>
                </FormFieldContainer>
            </FormContainer>
        </MainWrapper>
    );
}