import { S } from '@mobily/ts-belt';
import { Flex, Text } from '@radix-ui/themes';

import { Center } from '@/components/common/center';
import { TypedLink } from '@/components/common/typed-link';
import { Button } from '@/components/ui/button';
import { MAIN_PAGE } from '@/config/const';

export const ErrorPage = () => {
  return (
    <Flex direction="column" gap="2" asChild>
      <Center direction="column">
        <Text as="p" size="5" weight="bold">
          Something went wrong
        </Text>
        <TypedLink block href={MAIN_PAGE}>
          <Button>Go to {S.replace(MAIN_PAGE, '/', '')} Page</Button>
        </TypedLink>
      </Center>
    </Flex>
  );
};
