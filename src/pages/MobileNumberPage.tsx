import { useState } from 'react';
import { Card, CardBody, CardHeader, Input, Button } from '@nextui-org/react';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { createOTP } from '../services/api';

function MobileNumberPage() {
    const [phone, setPhone] = useState('');
    const navigate = useNavigate();
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    const mutation = useMutation({
        mutationFn: () => createOTP(phone),
        onSuccess: (data:any) => {
            console.log(data);
            navigate('/verify', { state: { phone_number: phone } });
        },
        onError: (error) => {
            //@ts-ignore
            if (error?.response && error.response.data) {setErrorMessage(error.response.data.error_details.fa_details);
            } else if (error.message) {
                setErrorMessage(error.message);
            }
            else {
                setErrorMessage('خطایی در ارسال داده وجود دارد');
            }
        },
    });

    const handleSubmit = (e:any) => {
        e.preventDefault();
        setErrorMessage(null);

        if (!phone.trim()) {
            setErrorMessage('شماره تلفن خود را وارد کنید');
            return;
        }

        const phoneRegex = /^09\d{9}$/;
        if (!phoneRegex.test(phone)) {
            setErrorMessage('شماره تلفن 11 رقمی است و با 09 شروع می شود');
            return;
        }

        mutation.mutate();
    };

    return (
        <Card radius={"sm"} shadow="lg" className="py-2 fixed top-24 z-10 w-[320px]">
            <CardHeader className="pb-0 px-4 flex-col items-center text-center">
                <h4 className="uppercase font-bold my-2">شماره موبایل خود را وارد نمایید.</h4>
                <p className="text-xs my-2">کد تایید برای شما ارسال خواهد شد</p>
            </CardHeader>
            <CardBody className="overflow-visible py-2">
                <form onSubmit={handleSubmit} className={"flex flex-col items-start"}>
                    <Input
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        classNames={{ inputWrapper: 'rounded-md', label: 'text-xs' }}
                        label="تلفن همراه"
                        labelPlacement="outside"
                        placeholder="xxx-xxx-xxx"
                        endContent={
                            <div className="text-gray-500 text-xs flex flex-row gap-3">
                                <span className="h-full">|</span>
                                <span>98+</span>
                            </div>
                        }
                    />
                    {errorMessage && (<div className={"text-danger text-xs my-2"}>{errorMessage}</div>)}
                    <Button isLoading={mutation.isPending} type="submit" className="w-full mt-4 bg-[#017785] text-white rounded-md">
                        {mutation.isPending ? 'در حال ارسال...' : 'ادامه'}
                    </Button>
                </form>
            </CardBody>
        </Card>
    );
}

export default MobileNumberPage;
