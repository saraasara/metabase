import { t } from "ttag";

import NoResults from "assets/img/no_results.svg";
import EmptyState from "metabase/components/EmptyState";
import ErrorDetails from "metabase/components/ErrorDetails/ErrorDetails";
import type { ErrorDetailsProps } from "metabase/components/ErrorDetails/types";
import { useToggle } from "metabase/hooks/use-toggle";
import { color } from "metabase/lib/colors";
import { Button, Icon, Tooltip } from "metabase/ui";

import {
  ErrorDiagnosticModalTrigger,
  ErrorExplanationModal,
} from "./ErrorDiagnosticModal";
import { ErrorPageRoot } from "./ErrorPages.styled";

export const GenericError = ({
  title = t`Something's gone wrong`,
  message = t`We've run into an error. You can try refreshing the page, or just go back.`,
  details,
}: {
  title?: string;
  message?: string;
  details: ErrorDetailsProps["details"];
}) => (
  <ErrorPageRoot>
    <EmptyState
      title={title}
      message={message}
      illustrationElement={
        <div className="QueryError-image QueryError-image--serverError" />
      }
    />
    <ErrorDetails className="pt2" details={details} centered />
    <ErrorDiagnosticModalTrigger />
  </ErrorPageRoot>
);

export const NotFound = ({
  title = t`We're a little lost...`,
  message = t`The page you asked for couldn't be found.`,
}: {
  title?: string;
  message?: string;
}) => (
  <ErrorPageRoot aria-label="error page">
    <EmptyState
      illustrationElement={<img src={NoResults} />}
      title={title}
      message={message}
    />
  </ErrorPageRoot>
);

export const Unauthorized = () => (
  <ErrorPageRoot>
    <EmptyState
      title={t`Sorry, you don’t have permission to see that.`}
      illustrationElement={<Icon name="key" size={100} />}
    />
  </ErrorPageRoot>
);

export const Archived = ({
  entityName,
  linkTo,
}: {
  entityName: string;
  linkTo: string;
}) => (
  <ErrorPageRoot>
    <EmptyState
      title={t`This ${entityName} has been archived`}
      illustrationElement={<Icon name="view_archive" size={100} />}
      link={linkTo}
    />
  </ErrorPageRoot>
);

export const SmallGenericError = ({
  message = t`Something's gone wrong, click for more information`,
}: {
  message?: string;
}) => {
  const [isModalOpen, { turnOn: openModal, turnOff: closeModal }] =
    useToggle(false);

  return (
    <ErrorPageRoot bordered>
      <Tooltip label={message}>
        <Button
          leftIcon={
            <Icon name="warning" size={32} color={color("text-light")} />
          }
          color="text-light"
          onClick={openModal}
          variant="unstyled"
        />
      </Tooltip>
      <ErrorExplanationModal isModalOpen={isModalOpen} onClose={closeModal} />
    </ErrorPageRoot>
  );
};
