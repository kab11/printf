/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   ft_ltoa.c                                          :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: kblack <marvin@42.fr>                      +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2019/01/28 20:34:37 by kblack            #+#    #+#             */
/*   Updated: 2019/03/07 17:24:24 by kblack           ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

#include "libft.h"

char			*ft_ltoa(intmax_t num)
{
	intmax_t	tmp;
	int			i;
	char		*str;

	tmp = ABS(num);
	i = 1;
	num < 0 ? i++ : 0;
	while (tmp > 9)
	{
		tmp /= 10;
		i++;
	}
	str = (char *)malloc(sizeof(char) * (i + 1));
	str[i] = '\0';
	i--;
	while (i >= 0)
	{
		str[i] = ABS(num) % 10 + '0';
		num /= 10;
		i--;
	}
	return (str);
}
