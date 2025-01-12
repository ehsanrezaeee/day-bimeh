import {Card, CardBody, Button, Input} from '@nextui-org/react';
import {useLocation, useNavigate} from 'react-router-dom';
import {FormEvent, useEffect, useState} from "react";

function PersonalInfoPage() {
    const navigate = useNavigate();
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const location = useLocation();

    const { phone_number } = location.state || {};

    useEffect(() => {
        if (!phone_number) {
            navigate('/');
        }
    }, [phone_number, navigate]);

    const [errors, setErrors] = useState<{ firstName?: string; lastName?: string }>({});

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const newErrors: { firstName?: string; lastName?: string } = {};

        if (!firstName.trim()) {
            newErrors.firstName = 'نام را وارد کنید.';
        }

        if (!lastName.trim()) {
            newErrors.lastName = 'نام خانوادگی را وارد کنید.';
        }

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
        } else {
            setErrors({});
            navigate('/agency-details',{state:{firstName,lastName,phone_number}});
        }
    };


    return (
        <Card radius={"sm"} shadow={"lg"} className="py-2 fixed top-24 z-10 w-[320px]">
            <CardBody className="overflow-visible py-2">
                <form onSubmit={handleSubmit}
                      className={"w-full  flex flex-col items-start"}>
                    <Input
                        variant={"bordered"}
                        classNames={{inputWrapper: "rounded-md", label: "text-xs"}}
                        className={"rounded-md my-2"}
                        label="نام"
                        labelPlacement={"outside"}
                        placeholder="نام را وارد کنید"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                    />
                    {errors?.firstName && (<p className={"text-danger text-xs mb-2"}>{errors.firstName}</p>)}
                    <Input
                        variant={"bordered"}
                        classNames={{inputWrapper: "rounded-md", label: "text-xs"}}
                        className={"rounded-md my-2"}
                        label="نام خوانوادگی"
                        labelPlacement={"outside"}
                        placeholder="نام خوانوادگی را وارد کنید"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                    />
                    {errors?.lastName && (<p className={"text-danger text-xs mt-1"}>{errors.lastName}</p>)}
                    <Button type={"submit"}
                            className={"w-full mt-4 bg-[#017785] text-white rounded-md"}>ادامه</Button>
                </form>
            </CardBody>
        </Card>
    )
}

export default PersonalInfoPage;