/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   print_bonuses.c                                    :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: kblack <marvin@42.fr>                      +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2018/12/10 22:25:44 by kblack            #+#    #+#             */
/*   Updated: 2018/12/10 22:25:45 by kblack           ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

#include "ft_printf.h"

void pf_other(const char **pf, va_list ap, pf_token *ftoken)
{
	if (*(*pf) == 'n') /*Nothing printed; corresponding argument must be a pointer to a signed int; $ of characters written so far is stored in the pointed location.*/
		pf_char(ap);
	else if (*(*pf) == 'b') /* print in binary */
		pf_char(ap);
	else if (*(*pf) == 'r') /* print a string of nonprintable characters */
		pf_char(ap);
	else if (*(*pf) == 'k') /* print a date in any ordinary ISO format */
		pf_char(ap);
}