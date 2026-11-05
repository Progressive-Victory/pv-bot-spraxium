import { ModalComponent, ModalInput, ModalTextDisplay } from '@spraxium/components'

@ModalTextDisplay({ content: 'This is only a test' })
@ModalComponent({ id: 'repeat-message-modal', title: 'Start Reoccuring Message' })
export class RepeatMessageModal {
    @ModalInput({
        label: 'Test',
        placeholder: 'This is a test',
        required: true,
        minLength: 3,
        maxLength: 100,
        style: 'short',
    })
    test_field!: string;
}