import {
  renderWithStudentContext
} from '../../../../tests/test-utils.tsx'
import { SubscriptionsDataTable } from '../SubscriptionsDataTable.tsx'
import { subscribeService } from '../../../services/subscribeService/subscribeService.ts'
import { GET_ALL } from '../__mocks__/subscriptionService.mock.ts'
import { waitFor } from '@testing-library/dom'

subscribeService.getAll = vi.fn().mockReturnValue(GET_ALL)
describe('SubscriptionDataTable', () => {
  it('should render', async () => {
    const { container, getByRole } = renderWithStudentContext(<SubscriptionsDataTable />)

    await waitFor(() => {
      expect(getByRole('gridcell', { name: /maria/i })).toBeVisible()
    })

    expect(container).toMatchSnapshot()
  })
})

