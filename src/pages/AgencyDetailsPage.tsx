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
import {ChangeEvent, FormEvent, useEffect, useState} from "react";
import {useMutation, useQuery} from "@tanstack/react-query";
import {checkAgency, getBranch, getCounties, getProvinces, registerAgent} from "../services/api.ts";
import debounce from 'lodash.debounce';
import {AxiosError} from "axios";
import {ResponseData} from "../services/types.ts";

function AgencyDetailsPage() {
    const navigate = useNavigate();
    const [person, setPerson] = useState("حقیقی");
    const [agencyCode, setAgencyCode] = useState('');
    const [agencyCodeError, setAgencyCodeError] = useState('');
    const [agentCodeSuccess, setAgentCodeSuccess] = useState(false);
    const [provinceId, setProvinceId] = useState('');
    const [countyId, setCountyId] = useState('');
    const [branchId, setBranchId] = useState('');
    const [branchName, setBranchName] = useState('');
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

    const {
        data: provinces,
        error: provincesError,
    } = useQuery({queryKey: ['provinces'], queryFn: getProvinces});

    const {
        data: counties,
        error: countiesError,refetch
    } = useQuery({queryKey: ['counties'], queryFn: () => getCounties(provinceId),enabled:!!provinceId});

    const {
        data: branch,
        error: branchError,
        refetch:refetchBranch
    } = useQuery({queryKey: ['branches'], queryFn: () => getBranch(provinceId,branchName),enabled:!!provinceId});

    useEffect(() => {
        if (provinceId) {
            refetch()
        }
    },[provinceId]);

    useEffect(() => {
        if (branchName) {
            refetchBranch()
        }
    },[branchName]);

    const checkAgencyCodeMutation = useMutation({
        mutationFn: () => checkAgency(agencyCode),
        onSuccess: () => {
            setAgentCodeSuccess(true)
            setAgencyCodeError('');
        },
        onError: (error: AxiosError<ResponseData>) => {
            console.log(error)
            setAgentCodeSuccess(false)
            if (error.response && error.response.data && error.response.data) {setAgencyCodeError(error.response.data.error_details.fa_details);
            } else {
                setAgencyCodeError('کد نمایندگی قبلا ثبت شده است.');
            }
        },
    });

    const debouncedCheckAgencyCode = debounce(() => {
        if (agencyCode.trim() !== '') {
            checkAgencyCodeMutation.mutate();
        }
    }, 700);

    const submitMutation = useMutation({
        mutationFn: (formData: Record<string, any>) => registerAgent(formData),
        onSuccess: (data) => {
            console.log(data)
            // navigate('/result', { state: data });
        },
        onError: (error: AxiosError<ResponseData>) => {
            console.error(error);
        },
    });

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const form = e.currentTarget;
        const formData = new FormData(form);

        const data: Record<string, any> = {};
        formData.forEach((value, key) => {
            data[key] = value;
        });
        data['agency_type'] = person
        data['first_name'] = firstName;
        data['last_name'] = lastName;
        data["phone_number"] = phone_number;
        data['province'] = provinceId;
        data['county'] = countyId;
        data['insurance_branch'] = branchId;
        submitMutation.mutate(data);
        // navigate('/verify');
    };
    const handleBranchName = debounce(({target}: ChangeEvent<HTMLInputElement>) => {
        setBranchName(target.value);
    },700)

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
                            name={"agent_code"}
                            placeholder="کد نمایندگی"
                            value={agencyCode}
                            onChange={(e) => {
                                setAgencyCode(e.target.value)
                                debouncedCheckAgencyCode()
                            }}
                        />
                        {provinces && <Autocomplete
                            radius={"sm"}
                            labelPlacement={"outside"}
                            variant={"bordered"}
                            className="max-w-[300px]"
                            defaultItems={provinces}
                            label="استان"
                            placeholder=""
                            isVirtualized={true}
                            onSelectionChange={key => setProvinceId(String(key))}
                        >
                            {(item) => <AutocompleteItem key={item?.id}>{item?.name}</AutocompleteItem>}
                        </Autocomplete>}
                        {provincesError && <p className={"text-xs text-danger my-1"}>{provincesError.message}</p>}
                        <Autocomplete
                            radius={"sm"}
                            labelPlacement={"outside"}
                            variant={"bordered"}
                            className="max-w-[300px]"
                            defaultItems={counties ? counties : []}
                            label="شهر"
                            placeholder=""
                            isDisabled={!provinceId}
                            isVirtualized={true}
                            onSelectionChange={key => setCountyId(String(key))}
                        >
                            {(item) => <AutocompleteItem key={item?.id}>{item?.name}</AutocompleteItem>}
                        </Autocomplete>
                        {countiesError && <p className={"text-xs text-danger my-1"}>{countiesError.message}</p>}
                        <Textarea name={"address"} variant={"bordered"} radius={"sm"} label={"آدرس"} className={"mt-2"}/>
                        <Autocomplete
                            radius={"sm"}
                            labelPlacement={"outside"}
                            variant={"bordered"}
                            className="max-w-[300px]"
                            defaultItems={branch ? branch?.response : []}
                            label="شعبه بیمه"
                            placeholder=""
                            isVirtualized={true}
                            isDisabled={!provinceId}
                            onInput={handleBranchName}
                            onSelectionChange={key => setBranchId(String(key))}
                        >
                            {(item) => <AutocompleteItem key={item?.id}>{item?.name}</AutocompleteItem>}
                        </Autocomplete>
                        {branchError && <p className={"text-xs text-danger my-1"}>{branchError.message}</p>}
                        <div className={"flex flex-row gap-1 w-full my-3"}>
                            <Input
                                variant={"bordered"}
                                classNames={{inputWrapper: "rounded-md", label: "text-xs"}}
                                className={"rounded-md"}
                                placeholder="تلفن ثابت"
                                labelPlacement={"outside"}
                                label={"تلفن ثابت"}
                                name={"phone"}
                            />
                            <Input
                                variant={"bordered"}
                                classNames={{inputWrapper: "rounded-md", label: "text-xs"}}
                                className={"rounded-md w-[70px]"}
                                placeholder="021"
                                labelPlacement={"outside"}
                                label={"کد ثابت"}
                                name={"city_code"}
                            />
                        </div>
                        <div className={"flex flex-row gap-3 items-center w-full my-3 text-xs"}>
                            <p>نوع نمایندگی</p>
                            <RadioGroup value={person} onValueChange={setPerson} color={"warning"} orientation={"horizontal"}>
                                <Radio classNames={{label: "text-xs", base: "mx-3"}} value="real">حقیقی</Radio>
                                <Radio classNames={{label: "text-xs"}} value="legal">حقوقی</Radio>
                            </RadioGroup>
                        </div>
                        {person == "legal" && <Input
                            variant={"bordered"}
                            classNames={{inputWrapper: "rounded-md", label: "text-xs"}}
                            className={"rounded-md"}
                            label="نام نمایندگی"
                            name={"Name"}
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