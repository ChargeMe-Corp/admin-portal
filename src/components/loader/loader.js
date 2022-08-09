import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  Spinner,
  Flex,
} from "@chakra-ui/react";
const Loader = ({ loading }) => {
  return (
    <Modal isOpen={loading} isCentered size={"xs"}>
      <ModalOverlay>
        <ModalContent
          width="-moz-max-content"
          display="flex"
          alignItems="center"
        >
          <Flex>
            <ModalBody>
              <Spinner
                thickness="4px"
                speed="0.65s"
                emptyColor="gray.200"
                color="blue.500"
                size={"xl"}
              />
            </ModalBody>
          </Flex>
        </ModalContent>
      </ModalOverlay>
    </Modal>
  );
};
export default Loader;
