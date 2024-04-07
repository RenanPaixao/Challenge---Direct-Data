import { SimpleDatePicker } from 'simple-chakra-ui-datepicker'
import { formatDate } from '../../utils/date.ts'
import { InputProps } from '@chakra-ui/react'
import { FieldInputProps, useField } from 'formik'
import { useEffect, useState } from 'react'
import { DateTime } from 'luxon'

type ChakraAndFormikInputProps = InputProps & Omit<FieldInputProps<never>, 'value' | 'onBlur' | 'onChange'>

export const DatePicker = (props: ChakraAndFormikInputProps) => {
  const { name, ...rest } = props
  const [,, helpers] = useField(name)
  const [date, setDate] = useState<string>(props.value as string ?? '')

  useEffect(() => {
    (async () => {
      await helpers.setValue(date)
    })()
  }, [date])

  return <>
    <SimpleDatePicker
      popoverProps={{
        colorScheme: 'purple',
        closeOnBlur: true,
        closeOnEsc: true
      }}
      inactiveColor={'var(--chakra-colors-purple-100)'}
      activeColor={'var(--chakra-colors-purple-500)'}
      formatDate={date => formatDate(date)}
      daysLabels={['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb']}
      months={['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro']}
      todayLabel={'Hoje'}
      clearLabel={'Limpar'}
      placeholder={'Selecione uma data'}
      aria-label={name}
      {...rest}
      onChange={date => {
        if(!date) {
          setDate('')
          return
        }

        setDate(DateTime.fromJSDate(date).toISODate() ?? '')
      }}
      defaultValue={props.value ? DateTime.fromISO(props.value as string).toJSDate() : undefined}
    />
  </>
}
