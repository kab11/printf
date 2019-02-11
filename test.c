/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   test.c                                             :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: kblack <marvin@42.fr>                      +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2019/02/01 22:16:33 by kblack            #+#    #+#             */
/*   Updated: 2019/02/01 22:22:47 by kblack           ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

#include <string.h>
#include <stdio.h>
# define FLAGS " .#-+0123456789lLh"

int main(void)
{
	char *str;
	int i = 0;

	str = "123++-asdknlk#+- ";
	while (strchr(FLAGS, str[i]))
	{
		printf("flag[%d]: %c", i, str[i]);
		i++;
	}
	return(0);
}
