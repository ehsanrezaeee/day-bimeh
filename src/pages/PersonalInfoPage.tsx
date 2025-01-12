import {Card, CardBody, Button, Input} from '@nextui-org/react';
import { useNavigate } from 'react-router-dom';

function PersonalInfoPage() {
    const navigate = useNavigate();

    const handleSubmit = (e: any) => {
        e.preventDefault();
        // You can add validation or API calls here
        navigate('/agency-details');
    };

    return (
        <Card radius={"sm"} shadow={"lg"} className="py-2 fixed top-24 z-10 w-[320px]">
            <CardBody className="overflow-visible py-2">
                <form onSubmit={handleSubmit}
                      className={"items-center flex flex-col w-full  flex flex-col items-center gap-8"}>
                    <Input
                        variant={"bordered"}
                        classNames={{inputWrapper: "rounded-md", label: "text-xs"}}
                        className={"rounded-md"}
                        label="نام"
                        labelPlacement={"outside"}
                        placeholder="نام را وارد کنید"
                    />
                    <Input
                        variant={"bordered"}
                        classNames={{inputWrapper: "rounded-md", label: "text-xs"}}
                        className={"rounded-md"}
                        label="نام خوانوادگی"
                        labelPlacement={"outside"}
                        placeholder="نام خوانوادگی را وارد کنید"
                    />
                    <Button type={"submit"}
                            className={"w-full mt-4 bg-[#017785] text-white rounded-md"}>ادامه</Button>
                </form>
            </CardBody>
        </Card>
    )
}

export default PersonalInfoPage;