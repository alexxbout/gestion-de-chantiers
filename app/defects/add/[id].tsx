import CustomForm, { CustomFormProps } from "@/components/custom/custom-form";
import { Box } from "@/components/ui/box";
import { Button, ButtonText } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import { CloseIcon, EditIcon, Icon } from "@/components/ui/icon";
import { Modal, ModalBackdrop, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader } from "@/components/ui/modal";
import { Text } from "@/components/ui/text";
import { Toast, ToastTitle, useToast } from "@/components/ui/toast";
import { WorksiteStatus } from "@/types/database";
import { BlurView } from "expo-blur";
import { useNavigation } from "expo-router";
import { useEffect, useState } from "react";
import { ScrollView, View } from "react-native";

const Layout = () => {
    const navigation = useNavigation();
    const toast = useToast();

    const [validating, setValidating] = useState(false);
    const [showConfirmModal, setShowConfirmModal] = useState(false);
    const [showStatusModal, setShowStatusModal] = useState(false);
    const [updateWorksiteStatus, setUpdateWorksiteStatus] = useState(false);
    const [toastId, setToastId] = useState<string>("");

    const fields: CustomFormProps["fields"] = [
        { key: "description", label: "Description", placeholder: "Décrire l'anomalie", type: "text", required: true },
        { key: "date", label: "Date de l'anomalie", placeholder: "Saisir la date de l'anomalie", type: "date", required: true },
    ];

    const worksiteStatusOptions = Object.entries(WorksiteStatus).map(([label, value]) => ({
        label: value,
        value: label.toLowerCase(),
    }));

    const worksiteStatusField: CustomFormProps["fields"] = [{ key: "status", label: "Statut du chantier", placeholder: "Sélectionner le statut du chantier", type: "select", options: worksiteStatusOptions, required: true }];

    useEffect(() => {
        navigation.setOptions({
            headerShown: !(showConfirmModal || showStatusModal),
        });
    }, [showConfirmModal, showStatusModal, navigation]);

    const handleSubmit = () => {
        setValidating(true);
        setShowConfirmModal(true);
    };

    const handleConfirmAnomaly = () => {
        setShowConfirmModal(false);
        setShowStatusModal(true);

        if (!toast.isActive(toastId)) {
            showToast();
        }
    };

    const showToast = () => {
        const newId = Math.random().toString();
        setToastId(newId);
        toast.show({
            id: newId,
            placement: 'top',
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
        setShowStatusModal(false);
        setValidating(false);
        setUpdateWorksiteStatus(false);
    };

    return (
        <>
            <ScrollView className="p-6 bg-white">
                <CustomForm data={[]} fields={fields} />
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

                    <Modal isOpen={showStatusModal} onClose={handleClose} size="md">
                        <ModalBackdrop />
                        <ModalContent>
                            <ModalHeader className="flex flex-col gap-y-5">
                                <View className="flex flex-row justify-center w-full">
                                    <Box className="flex items-center justify-center p-4 ml-auto bg-red-100 rounded-full w-max h-max aspect-square">
                                        <Icon as={EditIcon} size="xl" color="red" />
                                    </Box>
                                    <ModalCloseButton className="ml-auto">
                                        <Icon as={CloseIcon} size="md" className="stroke-background-400 group-[:hover]/modal-close-button:stroke-background-700 group-[:active]/modal-close-button:stroke-background-900 group-[:focus-visible]/modal-close-button:stroke-background-900" />
                                    </ModalCloseButton>
                                </View>
                                <Heading size="md">Souhaitez-vous mettre à jour le statut du chantier ?</Heading>
                            </ModalHeader>
                            <ModalBody>
                                <Text size="sm">Certaines anomalies nécessitent une modification du statut actuel du chantier.</Text>
                                {updateWorksiteStatus && <CustomForm data={[]} fields={worksiteStatusField} />}
                            </ModalBody>
                            <ModalFooter className="flex flex-col">
                                {!updateWorksiteStatus && (
                                    <Button className="w-full" variant="outline" action="secondary" onPress={handleClose}>
                                        <ButtonText>Ne pas modifier</ButtonText>
                                    </Button>
                                )}
                                <Button
                                    className="w-full"
                                    onPress={() => {
                                        setUpdateWorksiteStatus(true);
                                    }}>
                                    <ButtonText>{updateWorksiteStatus ? "Valider le statut" : "Mettre à jour"}</ButtonText>
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