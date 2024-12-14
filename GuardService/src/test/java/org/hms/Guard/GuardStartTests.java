package org.hms.Guard;

import com.netflix.discovery.converters.Auto;
import org.hms.Guard.dto.PasswordChange;
import org.hms.Guard.service.CRUDService;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit.jupiter.SpringExtension;

@SpringBootTest
@ExtendWith(SpringExtension.class)
class GuardStartTests {
/*@Autowired
	CRUDService crudService;
	@Test
	void contextLoads() {
		PasswordChange pwd = new PasswordChange();
pwd.setEmail("paritosh.anand@gmail.com");
pwd.setOp("Paritosh123");
pwd.setNp1("Shrish123");
pwd.setNp2("Shrish123");

		System.out.println(crudService.changePwd(pwd));
	}*/

}
