import CustomForm from "@/components/custom/custom-form";
import { Button, ButtonText } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import { Modal, ModalBackdrop, ModalBody, ModalContent, ModalFooter, ModalHeader } from "@/components/ui/modal";
import { Text } from "@/components/ui/text";
import { Toast, ToastTitle, useToast } from "@/components/ui/toast";
import { findDocumentById, updateDocument } from "@/firebase/api";
import { CollectionName, Defect, Worksite } from "@/types/database";
import { BlurView } from "expo-blur";
import { useLocalSearchParams, useNavigation, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { ScrollView } from "react-native";

const Layout = () => {
    const router = useRouter();
    const { id } = useLocalSearchParams();
    const navigation = useNavigation();
    const toast = useToast();

    const [validating, setValidating] = useState(false);
    const [showConfirmModal, setShowConfirmModal] = useState(false);
    const [toastId, setToastId] = useState<string>("");

    const [formValues, setFormValues] = useState<{ [key: string]: any }>({
        description: "",
        date: "",
    });

    const handleFormValuesChange = (values: { [key: string]: any }) => {
        setFormValues((prev) => ({
            ...prev,
            ...values,
        }));
    };

    const [worksite, setWorksite] = useState<Worksite | null>(null);

    useEffect(() => {
        const fetchWorksite = async () => {
            try {
                const fetchedWorksite = await findDocumentById(Number.parseInt(id as string), CollectionName.WORKSITE);
                setWorksite(fetchedWorksite as Worksite);
            } catch (error) {
                console.error("Error fetching worksite: ", error);
            }
        };

        if (id) {
            fetchWorksite();
        }
    }, [id]);

    useEffect(() => {
        navigation.setOptions({
            headerShown: !showConfirmModal,
        });
    }, [showConfirmModal, navigation]);

    const handleSubmit = () => {
        setValidating(true);
        setShowConfirmModal(true);
    };

    const handleConfirmAnomaly = () => {
        setShowConfirmModal(false);

        if (!toast.isActive(toastId)) {
            showToast();
            addDefect();

            router.back();
        }
    };

    const showToast = () => {
        const newId = Math.random().toString();
        setToastId(newId);
        toast.show({
            id: newId,
            placement: "top",
            duration: 3000,
            render: ({ id }) => (
                <Toast nativeID={"toast-" + id} action="success" variant="solid">
                    <ToastTitle>Anomalie ajoutée avec succès</ToastTitle>
                </Toast>
            ),
        });
    };

    const handleClose = () => {
        setShowConfirmModal(false);
        setValidating(false);
    };

    const addDefect = () => {
        if (worksite) {
            const defect: Defect = {
                id: worksite.defects.length + 1,
                description: formValues.description,
                date: formValues.date,
            };

            worksite.defects.push(defect);

            updateDocument(Number.parseInt(id as string), CollectionName.WORKSITE, worksite);
        } else {
            console.error("Error adding defect: worksite not found");
        }
    };

    return (
        <>
            <ScrollView className="p-6 bg-white">
                <CustomForm
                    data={formValues}
                    fields={[
                        {
                            key: "description",
                            label: "Description",
                            placeholder: "Décrire l'anomalie",
                            type: "text",
                            required: true,
                        },
                        {
                            key: "date",
                            label: "Date de l'anomalie",
                            placeholder: "aaaa-mm-jj",
                            type: "date",
                            required: true,
                        },
                    ]}
                    onFormValuesChange={(values) => handleFormValuesChange(values)}
                />
            </ScrollView>

            <BlurView className="shadow-[0px_-15px_60px_5px_rgba(0,0,0,0.1)] absolute bottom-0 flex flex-row items-center justify-center w-screen p-4 h-max" intensity={25} tint="light">
                <Button onPress={() => handleSubmit()} className="flex-1 text-white" variant="solid" size="lg" action="negative">
                    <ButtonText>Valider cette anomalie</ButtonText>
                </Button>
            </BlurView>

            {validating && (
                <BlurView className="absolute top-0 left-0 flex items-center justify-center w-screen h-screen">
                    <Modal isOpen={showConfirmModal} onClose={handleClose} size="md">
                        <ModalBackdrop />
                        <ModalContent>
                            <ModalHeader>
                                <Heading size="md">Confirmer l'anomalie</Heading>
                            </ModalHeader>
                            <ModalBody>
                                <Text>Voulez-vous confirmer la création de cette anomalie ?</Text>
                            </ModalBody>
                            <ModalFooter className="flex flex-col">
                                <Button variant="outline" action="secondary" onPress={handleClose} className="w-full">
                                    <ButtonText>Annuler</ButtonText>
                                </Button>
                                <Button onPress={handleConfirmAnomaly} className="w-full">
                                    <ButtonText>Confirmer</ButtonText>
                                </Button>
                            </ModalFooter>
                        </ModalContent>
                    </Modal>
                </BlurView>
            )}
        </>
    );
};

export default Layout;
