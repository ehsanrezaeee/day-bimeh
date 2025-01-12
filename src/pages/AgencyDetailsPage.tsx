import {
    Card,
    CardBody,
    Button,
    Input,
    Autocomplete,
    AutocompleteItem,
    Textarea,
    RadioGroup,
    Radio, Alert,
} from '@nextui-org/react';
import {useLocation, useNavigate} from 'react-router-dom';
import {animals} from "../assets/animals.ts";
import {useEffect, useState} from "react";
import {useMutation} from "@tanstack/react-query";
import {checkAgency} from "../services/api.ts";
import debounce from 'lodash.debounce';

function AgencyDetailsPage() {
    const navigate = useNavigate();
    const [person, setPerson] = useState("حقیقی");
    const [agencyCode, setAgencyCode] = useState('');
    const [agencyCodeError, setAgencyCodeError] = useState('');
    const [agentCodeSuccess, setAgentCodeSuccess] = useState(false);
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

    const checkAgencyCodeMutation = useMutation({
        mutationFn: () => checkAgency(agencyCode),
        onSuccess: () => {
            setAgentCodeSuccess(true)
            setAgencyCodeError('');
        },
        onError: (error) => {
            setAgentCodeSuccess(false)
            //@ts-ignore
            if (error.response && error.response.data && error.response.data.message) {setAgencyCodeError(error.response.data.error_details.fa_details);
            } else {
                setAgencyCodeError('کد نمایندگی قبلا ثبت شده است.');
            }
        },
    });

    const debouncedCheckAgencyCode = debounce(() => {
        if (agencyCode.trim() !== '') {
            checkAgencyCodeMutation.mutate();
        }
    }, 600);

    const handleSubmit = (e: any) => {
        e.preventDefault();
        navigate('/verify');
    };

    return (
        <>
            {agencyCodeError && <Alert hideIconWrapper radius={"sm"} classNames={{
                alertIcon: "bg-yellow-500 flex items-center justify-center w-7 h-7 rounded-lg",
                base: "!z-20 fixed top-5 w-[300px] text-black",
                title:"text-xs text-start"
            }} icon={<div><img src={"/images/alert.svg"}/></div>}
                    color={"warning"} title={agencyCodeError}/>}
            <Card shadow={"lg"} radius={"sm"} className="py-2 fixed top-24 z-10 w-[320px]">
                <CardBody className="overflow-visible py-2 flex flex-col items-center gap-2">
                    <form onSubmit={handleSubmit}
                          className={"items-start flex flex-col w-full gap-4"}>
                        <Input
                            startContent={<p>{agentCodeSuccess && <img src={"/images/checked.svg"} alt={"checked"} /> }</p>}
                            variant={"bordered"}
                            classNames={{inputWrapper: "rounded-md", label: "text-xs"}}
                            className={"rounded-md"}
                            labelPlacement={"outside"}
                            placeholder="کد نمایندگی"
                            value={agencyCode}
                            onChange={(e) => {
                                setAgencyCode(e.target.value)
                                debouncedCheckAgencyCode()
                            }}
                        />
                        <Autocomplete
                            radius={"sm"}
                            labelPlacement={"outside"}
                            variant={"bordered"}
                            className="max-w-[300px]]"
                            defaultItems={animals}
                            label="استان"
                            placeholder=""
                            isVirtualized={true}
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
                            isVirtualized={true}
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
                            isVirtualized={true}
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
        </>

)
}

export default AgencyDetailsPage;