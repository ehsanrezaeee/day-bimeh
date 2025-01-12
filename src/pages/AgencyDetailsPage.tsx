import {
    Card,
    CardBody,
    Button,
    Input,
    Autocomplete,
    AutocompleteItem,
    Textarea,
    RadioGroup,
    Radio
} from '@nextui-org/react';
import {useLocation, useNavigate} from 'react-router-dom';
import {animals} from "../assets/animals.ts";
import {useEffect, useState} from "react";

function AgencyDetailsPage() {
    const navigate = useNavigate();
    const [person, setPerson] = useState("حقیقی");
    const location = useLocation();

    const { phone_number,firstName,lastName } = location.state || {};

    useEffect(() => {
        if (!phone_number) {
            navigate('/');
        }
        if (!firstName || !lastName) {
            navigate('/personal-info');
        }
    }, [phone_number, navigate,firstName, lastName]);

    const handleSubmit = (e: any) => {
        e.preventDefault();
        // You can add validation or API calls here
        navigate('/verify');
    };

    return (
        <Card shadow={"lg"} radius={"sm"} className="py-2 fixed top-24 z-10 w-[320px]">
            {/*<Alert hideIconWrapper radius={"sm"} classNames={{alertIcon:"bg-red-500 flex items-center justify-center w-7 h-7 rounded-lg",base:"!z-20"}} icon={<div><img src={"/images/alert.svg"}/></div>}*/}
            {/*       color={"danger"} title={`کد وارد شده صحیح نمی باشد`} />*/}
            <CardBody className="overflow-visible py-2 flex flex-col items-center gap-2">
                <form onSubmit={handleSubmit}
                      className={"items-center flex flex-col w-full  flex flex-col items-center gap-4"}>
                    <Input
                        variant={"bordered"}
                        classNames={{inputWrapper: "rounded-md", label: "text-xs"}}
                        className={"rounded-md"}
                        labelPlacement={"outside"}
                        placeholder="کد نمایندگی"
                    />
                    <Autocomplete
                        radius={"sm"}
                        labelPlacement={"outside"}
                        variant={"bordered"}
                        className="max-w-[300px]]"
                        defaultItems={animals}
                        label="استان"
                        placeholder=""
                    >
                        {(item) => <AutocompleteItem key={item.key}>{item.label}</AutocompleteItem>}
                    </Autocomplete>
                    <Autocomplete
                        radius={"sm"}
                        labelPlacement={"outside"}
                        variant={"bordered"}
                        className="max-w-[300px]]"
                        defaultItems={animals}
                        label="شهر"
                        placeholder=""
                    >
                        {(item) => <AutocompleteItem key={item.key}>{item.label}</AutocompleteItem>}
                    </Autocomplete>
                    <Textarea dir={"ltr"} variant={"bordered"} radius={"sm"} label={"آدرس"} className={"mt-2"}/>
                    <Autocomplete
                        radius={"sm"}
                        labelPlacement={"outside"}
                        variant={"bordered"}
                        className="max-w-[300px]]"
                        defaultItems={animals}
                        label="شعبه بیمه"
                        placeholder=""
                    >
                        {(item) => <AutocompleteItem key={item.key}>{item.label}</AutocompleteItem>}
                    </Autocomplete>
                    <div className={"flex flex-row gap-1 w-full my-3"}>
                        <Input
                            variant={"bordered"}
                            classNames={{inputWrapper: "rounded-md", label: "text-xs"}}
                            className={"rounded-md"}
                            placeholder="نام را وارد کنید"
                        />
                        <Input
                            variant={"bordered"}
                            classNames={{inputWrapper: "rounded-md", label: "text-xs"}}
                            className={"rounded-md w-[70px]"}
                            placeholder="021"
                        />
                    </div>
                    <div className={"flex flex-row gap-3 items-center w-full my-3 text-xs"}>
                        <p>نوع نمایندگی</p>
                        <RadioGroup value={person} onValueChange={setPerson} color={"warning"} orientation={"horizontal"}>
                            <Radio classNames={{label: "text-xs", base: "mx-3"}} value="حقیقی">حقیقی</Radio>
                            <Radio classNames={{label: "text-xs"}} value="حقوقی">حقوقی</Radio>
                        </RadioGroup>
                    </div>
                    {person == "حقوقی" && <Input
                        variant={"bordered"}
                        classNames={{inputWrapper: "rounded-md", label: "text-xs"}}
                        className={"rounded-md"}
                        label="نام نمایندگی"
                        labelPlacement={"outside"}
                        placeholder="نام نمایندگی را وارد کنید"
                    />}
                    <Button type={"submit"} className={"w-full mt-4 bg-[#017785] text-white rounded-md"}>ثبت نام</Button>
                </form>
            </CardBody>
        </Card>
)
}

export default AgencyDetailsPage;