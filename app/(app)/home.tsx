import Button from '@/components/button';
import Heading from '@/components/heading';
import { useRouter } from 'expo-router';

export default function Home(){
    const router = useRouter();
    return(
        <>
          <Heading text='Home' />
          <Button text='Dashboard' onPressFunction={() => {router.push('/dashboard')}} />
        </>
    );
}