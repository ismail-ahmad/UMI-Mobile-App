import FormField from '@/components/form_field';
import FormFieldContainer from '@/components/form_field_container';
import MainWrapper from '@/components/main_wrapper';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';


export default function MasterAdmin(){
    return(
        <MainWrapper>
                <FormFieldContainer style={{ flexDirection: 'column', justifyContent: 'center', alignItems: 'center', flex: 1}}>
                    <FormField text='Add New User' route={'/form'}>
                        <MaterialIcons size={28} name='person-add' color='white' />
                    </FormField>
                    <FormField text='Add New User' route={'/form'}>
                        <MaterialIcons size={28} name='person-add' color='white' />
                    </FormField>
                </FormFieldContainer>
        </MainWrapper>
    );
}