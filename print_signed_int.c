/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   print_signed_int.c                                 :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: kblack <marvin@42.fr>                      +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2018/12/10 22:24:50 by kblack            #+#    #+#             */
/*   Updated: 2018/12/10 22:24:52 by kblack           ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

#include "ft_printf.h"
#include "math.h"

void pf_int(va_list ap)
{
	printf("---- ENTERING pf_int ----\n");
	/* needs to be changed from an int into a char in order to be written */
	int num;
	static char *int_str;
	static short i;
	static short sign;

	num = va_arg(ap, int);
	i = sizeof(int) * 4;
	int_str = ft_strnew(i + 1);	/* create block of memory */
	sign = (num < 0 ? -1 : 1);	/* determine if number is less than 0 */
	int_str[i] = '\0';
	while (--i > 0) /* will take 15 characters 16th is '\0' */
	{
		if (int_str[i] != '-')
		{	
			int_str[i] = ft_abs(num) % 10 + '0'; /* need to find abs of num; otherise its only returns junk values */
			num /= 10;
		}
	}
	while (int_str[++i] == '0')
		;
	if (sign == -1)
		ft_putchar('-');
	while (int_str[i])
		ft_putchar(int_str[i++]);
	/* work backwards (write? return?)*/
}

// void pf_float(va_list ap)
// {
// 	printf("---- ENTERING pf_float ----\n");
// 	double num;
// 	static char *int_str;
// 	static short i;
// 	static short sign;

// 	num = va_arg(ap, double);
// 	i = sizeof(double) * 4;
// 	int_str = ft_strnew(i + 1);	/* create block of memory */
// 	sign = (num < 0 ? -1 : 1);	/* determine if number is less than 0 */
// 	int_str[i] = '\0';
// 	printf("num:  %f\n", num);
// 	num = (int)(num * 100) % 100;
// 	//printf("num:  %f\n", num);
// 	while (--i > 0) /* will take 15 characters 16th is '\0' */
// 	{
// 		if (int_str[i] != '-' && int_str[i] != '.')
// 		{	
// 			printf("int_str[i]: %d\n", int_str[i]);
// 			int_str[i] = fabs(num) % 10.0 + '0';  /* need to find abs of num; otherise its only returns junk values */
// 			num /= 10;
// 		}
// 		if (int_str[i] == '.')
// 			num
// 	}
// 	while (int_str[++i] == '0')
// 		;
// 	if (sign == -1)
// 		ft_putchar('-');
// 	while (int_str[i])
// 		ft_putchar(int_str[i++]);
// }

	// str[len] = copy % 10 + '0';
	// while (copy /= 10)
	// 	str[--len] = copy % 10 + '0';
	// if (n < 0)
	// 	*(str + 0) = '-';

void pf_signed(const char **pf, va_list ap)
{
	if (*(*pf) == 'd' || *(*pf) == 'i') /* signed decimal integer */
		pf_int(ap);
	// else if (*(*pf) == 'f')    Decimal floating point, lowercase 
	// 	pf_float(ap);
	// else if (*(*pf) == 'e') /* Scientific notation (mantissa/exponent), lowercase */
	// 	pf_char(ap);
	// else if (*(*pf) == 'g') /*	Use the shortest representation: %e or %f */
	// 	pf_char(ap);
}

