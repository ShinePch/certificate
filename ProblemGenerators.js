// ========================== 서브넷/네트워크 알고리즘 시작 ==========================
function generateRandomSubnetProblem(categoryIndex) {
    const octets = [
        Math.floor(Math.random() * 256),
        Math.floor(Math.random() * 256),
        Math.floor(Math.random() * 256),
        Math.floor(Math.random() * 256)
    ];
    
    const subnetMasks = [128, 192, 224, 240, 248, 252];
    const subnetMask = subnetMasks[Math.floor(Math.random() * subnetMasks.length)];
    
    const ipAddress = `${octets[0]}.${octets[1]}.${octets[2]}.${octets[3]}`;
    const maskString = `255.255.255.${subnetMask}`;
    
    const networkAddress = octets[3] & subnetMask;
    const hostBits = Math.log2(256 - subnetMask);
    const totalHosts = Math.pow(2, hostBits) - 2;
    
    categories[categoryIndex].problems[currentProblemIndex].question = 
        `IP 주소가 ${ipAddress}이고 서브넷마스크 ${maskString}일 때 아래의 답을 작성하시오.\n(1) 괄호안에 들어갈 네트워크 주소 : ${octets[0]}.${octets[1]}.${octets[2]}.( )\n(2) 해당 네트워크 주소와 브로드캐스트 주소를 제외한 호스트 개수`;
    
    categories[categoryIndex].problems[currentProblemIndex].answer = 
        `(1) ${networkAddress}\n(2) ${totalHosts}`;
}

function generateRandomFLSMProblem(categoryIndex) {
    const octets = [
        192,
        168,
        Math.floor(Math.random() * 256),
        0
    ];
    
    const cidrs = [20, 22, 24];
    const cidr = cidrs[Math.floor(Math.random() * cidrs.length)];
    
    const divisions = [2, 4, 8];
    const divisionCount = divisions[Math.floor(Math.random() * divisions.length)];
    
    const whichNetwork = Math.floor(Math.random() * divisionCount) + 1;
    
    const newCidr = cidr + Math.log2(divisionCount);
    const hostBits = 32 - newCidr;
    const subnetSize = Math.pow(2, hostBits);
    
    const networkBase = `${octets[0]}.${octets[1]}.${octets[2]}.${octets[3]}`;
    
    let broadcastIP;
    if (cidr === 24) {
        const broadcastLastOctet = (whichNetwork * subnetSize) - 1;
        broadcastIP = `${octets[0]}.${octets[1]}.${octets[2]}.${broadcastLastOctet}`;
    } else if (cidr === 22) {
        const totalBroadcast = (whichNetwork * subnetSize) - 1;
        const thirdOctet = Math.floor(totalBroadcast / 256);
        const fourthOctet = totalBroadcast % 256;
        broadcastIP = `${octets[0]}.${octets[1]}.${thirdOctet}.${fourthOctet}`;
    } else {
        const totalBroadcast = (whichNetwork * subnetSize) - 1;
        const thirdOctet = Math.floor(totalBroadcast / 256);
        const fourthOctet = totalBroadcast % 256;
        broadcastIP = `${octets[0]}.${octets[1]}.${thirdOctet}.${fourthOctet}`;
    }
    
    const networkNames = ['첫', '두', '세', '네', '다섯', '여섯', '일곱', '여덟'];
    
    categories[categoryIndex].problems[currentProblemIndex].question = 
        `${networkBase}/${cidr}인 네트워크를 FLSM ${divisionCount}개로 분할하였다. ${networkNames[whichNetwork - 1]}번째 네트워크 브로드캐스트 IP를 10진수로 변환한 값을 작성하시오.`;
    
    categories[categoryIndex].problems[currentProblemIndex].answer = broadcastIP;
}

function generateRandomIPAllocationProblem(categoryIndex) {
    const baseOctet1 = 192;
    const baseOctet2 = 168;
    const baseOctet3 = Math.floor(Math.random() * 50) + 1;
    
    const ip1 = `${baseOctet1}.${baseOctet2}.${baseOctet3}.${Math.floor(Math.random() * 200) + 1}/24`;
    const ip3 = `${baseOctet1 - Math.floor(Math.random() * 60)}.${200 + Math.floor(Math.random() * 55)}.${Math.floor(Math.random() * 50)}.${Math.floor(Math.random() * 200) + 1}/22`;
    const ip6 = `${baseOctet1}.${baseOctet2}.${baseOctet3 + 1}.${Math.floor(Math.random() * 200) + 1}/24`;
    
    const choice1 = `${baseOctet1}.${baseOctet2}.${baseOctet3}.0`;
    const choice2 = `${baseOctet1}.${baseOctet2}.${baseOctet3}.${Math.floor(Math.random() * 200) + 50}`;
    const choice3 = `${baseOctet1}.${baseOctet2}.${baseOctet3 + 1}.0`;
    const choice4 = `${baseOctet1}.${baseOctet2}.${baseOctet3 + 1}.${Math.floor(Math.random() * 200) + 200}`;
    
    const ip3Parts = ip3.split('.');
    const ip3Base = `${ip3Parts[0]}.${ip3Parts[1]}.${parseInt(ip3Parts[2]) & 0xFC}.0`;
    const choice5 = ip3Base;
    const choice6 = `${ip3Parts[0]}.${ip3Parts[1]}.${(parseInt(ip3Parts[2]) & 0xFC) + 3}.${Math.floor(Math.random() * 200) + 200}`;
    
    categories[categoryIndex].problems[currentProblemIndex].question = 
        `네트워크에서 라우터를 통한 할당 가능한 2번, 4번, 5번의 IP를 작성하시오.\n1) ${ip1}\n3) ${ip3}\n6) ${ip6}\n\n보기\n${choice1}, ${choice2}, ${choice3}, ${choice4}, ${choice5}, ${choice6}`;
    
    categories[categoryIndex].problems[currentProblemIndex].answer = 
        `2) ${choice2}\n4) ${choice4}\n5) ${choice6}`;
}
// 4번: C클래스 서브넷 마스크 계산 (호스트 수 기반)
function generateSubnetMaskForHostsProblem(categoryIndex) {
    // 필요한 서브넷 개수 (20~32개)
    const requiredSubnets = 20 + Math.floor(Math.random() * 13);
    // 필요한 호스트 개수 (4~8개)
    const requiredHosts = 4 + Math.floor(Math.random() * 5);
    
    // 호스트 비트 계산 (호스트+2를 수용할 수 있는 비트)
    const hostBits = Math.ceil(Math.log2(requiredHosts + 2));
    // 서브넷 비트 계산
    const subnetBits = Math.ceil(Math.log2(requiredSubnets));
    
    // C클래스는 8비트만 사용 가능
    if (subnetBits + hostBits > 8) {
        // 호스트 비트 우선
        const adjustedHostBits = hostBits;
        const adjustedSubnetBits = 8 - adjustedHostBits;
    }
    
    // 서브넷 마스크 계산 (마지막 옥텟)
    const maskValue = 256 - Math.pow(2, hostBits);
    const subnetMask = `255.255.255.${maskValue}`;
    
    // 선택지 생성 (정답 포함)
    const choices = [];
    choices.push(`255.255.255.${Math.max(192, maskValue - 16)}`);
    choices.push(`255.255.255.${maskValue - 8}`);
    choices.push(`255.255.255.${maskValue}`); // 정답
    choices.push(`255.255.255.${Math.min(252, maskValue + 8)}`);
    
    categories[categoryIndex].problems[currentProblemIndex].question = 
        `IPv4의 C클래스 네트워크를 ${requiredSubnets}개의 서브넷으로 나누고, 각 서브넷에는 ${requiredHosts}~${requiredHosts+1}개의 호스트를 연결하려고 한다. 이러한 서브넷을 구성하기 위한 서브넷 마스크 값은?\n\n1. ${choices[0]}\n2. ${choices[1]}\n3. ${choices[2]}\n4. ${choices[3]}`;
    
    categories[categoryIndex].problems[currentProblemIndex].answer = subnetMask;
}

// 5번: 서브넷 수와 호스트 수 계산
function generateSubnetHostCountProblem(categoryIndex) {
    // B클래스 기준 서브넷 마스크 선택 (/20 ~ /28)
    const prefixOptions = [20, 22, 24, 26, 28];
    const prefix = prefixOptions[Math.floor(Math.random() * prefixOptions.length)];
    
    // 서브넷 비트 (B클래스는 /16 기본)
    const subnetBits = prefix - 16;
    const subnetCount = Math.pow(2, subnetBits) - 2; // subnet-zero 제외
    
    // 호스트 비트
    const hostBits = 32 - prefix;
    const hostCount = Math.pow(2, hostBits) - 2;
    
    // 서브넷 마스크 계산
    const thirdOctet = prefix >= 24 ? 255 : (256 - Math.pow(2, 24 - prefix));
    const fourthOctet = prefix <= 24 ? 0 : (256 - Math.pow(2, 32 - prefix));
    const subnetMask = `255.255.${thirdOctet}.${fourthOctet}`;
    
    // 오답 선택지 생성
    const wrongChoices = [
        `서브넷 ${Math.floor(subnetCount / 2)}, 호스트 ${hostCount * 2}`,
        `서브넷 ${hostCount}, 호스트 ${subnetCount}`,
        `서브넷 ${subnetCount + 2}, 호스트 ${hostCount}`
    ];
    
    const correctAnswer = `서브넷 ${subnetCount}, 호스트 ${hostCount}`;
    
    // 선택지 섞기
    const allChoices = [...wrongChoices, correctAnswer];
    shuffleArray(allChoices);
    
    categories[categoryIndex].problems[currentProblemIndex].question = 
        `클래스 B주소를 가지고 서브넷 마스크 ${subnetMask}으로 서브넷을 만들었을 때 나오는 서브넷의 수와 호스트의 수가 맞게 짝지어진 것은?\n\n1. ${allChoices[0]}\n2. ${allChoices[1]}\n3. ${allChoices[2]}\n4. ${allChoices[3]}`;
    
    categories[categoryIndex].problems[currentProblemIndex].answer = correctAnswer;
}

// 6번: 최적 서브넷 마스크 선택 (가장 많은 호스트)
function generateOptimalSubnetMaskProblem(categoryIndex) {
    // 필요한 서브넷 개수 (4~10개)
    const requiredSubnets = 4 + Math.floor(Math.random() * 7);
    
    // 필요한 서브넷 비트 계산
    const subnetBits = Math.ceil(Math.log2(requiredSubnets));
    
    // B클래스: /16 + 서브넷 비트
    const prefix = 16 + subnetBits;
    
    // 서브넷 마스크 계산
    const thirdOctet = 256 - Math.pow(2, 24 - prefix);
    const subnetMask = `255.255.${thirdOctet}.0`;
    
    // 선택지 생성 (틀린 것들)
    const choices = [
        `255.255.${Math.max(128, thirdOctet - 64)}.0`,
        `255.255.${thirdOctet - 16}.0`,
        `255.255.${thirdOctet}.0`, // 정답
        `255.255.${Math.min(254, thirdOctet + 8)}.0`
    ];
    
    categories[categoryIndex].problems[currentProblemIndex].question = 
        `B Class 네트워크에서 ${requiredSubnets}개의 서브넷이 필요할 때, 가장 많은 호스트를 사용할 수 있는 서브넷 마스크 값은?\n\n1. ${choices[0]}\n2. ${choices[1]}\n3. ${choices[2]}\n4. ${choices[3]}`;
    
    categories[categoryIndex].problems[currentProblemIndex].answer = subnetMask;
}

// 7번: FLSM N번째 네트워크 M번째 사용가능 IP
function generateFLSMSpecificIPProblem(categoryIndex) {
    // 기본 네트워크 (C클래스)
    const baseIP = `192.168.${Math.floor(Math.random() * 100) + 1}.0`;
    
    // 분할 개수 (4, 8, 16개)
    const subnetOptions = [4, 8, 16];
    const subnetCount = subnetOptions[Math.floor(Math.random() * subnetOptions.length)];
    const subnetBits = Math.log2(subnetCount);
    
    // 몇 번째 네트워크? (2~subnetCount)
    const whichNetwork = 2 + Math.floor(Math.random() * (subnetCount - 1));
    
    // 몇 번째 IP? (3~6)
    const whichIP = 3 + Math.floor(Math.random() * 4);
    
    // 블록 크기 계산
    const blockSize = 256 / subnetCount;
    
    // N번째 네트워크 주소 계산 (1-based)
    const networkAddress = (whichNetwork - 1) * blockSize;
    
    // M번째 사용가능 IP (네트워크 주소 + M)
    const usableIP = networkAddress + whichIP;
    
    const answer = baseIP.replace('.0', `.${usableIP}`);
    
    // 선택지 생성
    const choices = [
        baseIP.replace('.0', `.${networkAddress}`),
        baseIP.replace('.0', `.${usableIP - 1}`),
        answer, // 정답
        baseIP.replace('.0', `.${usableIP + 2}`)
    ];
    
    categories[categoryIndex].problems[currentProblemIndex].question = 
        `${baseIP}/24 네트워크를 FLSM방식으로 ${subnetCount}개의 Subnet으로 나누고 IP Subnet-zero를 적용했다. 이 때 Subnetting 된 네트워크 중 ${whichNetwork}번째 네트워크의 ${whichIP}번째 사용 가능한 IP는 무엇인가?\n\n1. ${choices[0]}\n2. ${choices[1]}\n3. ${choices[2]}\n4. ${choices[3]}`;
    
    categories[categoryIndex].problems[currentProblemIndex].answer = answer;
}

// 8번: FLSM N번째 네트워크 브로드캐스트 주소
function generateFLSMBroadcastProblem(categoryIndex) {
    // 기본 네트워크
    const octet1 = 192 + Math.floor(Math.random() * 30);
    const octet2 = Math.floor(Math.random() * 255);
    const octet3 = Math.floor(Math.random() * 255);
    const baseIP = `${octet1}.${octet2}.${octet3}.0`;
    
    // 분할 개수 (8~16개)
    const subnetCount = 8 + Math.floor(Math.random() * 9);
    const subnetBits = Math.ceil(Math.log2(subnetCount));
    
    // 몇 번째 네트워크? (subnetCount - 2 ~ subnetCount)
    const whichNetwork = subnetCount - 2 + Math.floor(Math.random() * 3);
    
    // 블록 크기
    const blockSize = 256 / Math.pow(2, subnetBits);
    
    // N번째 네트워크 브로드캐스트 주소
    const networkStart = (whichNetwork - 1) * blockSize;
    const broadcastIP = networkStart + blockSize - 1;
    
    const answer = baseIP.replace('.0', `.${Math.floor(broadcastIP)}`);
    
    // 선택지 생성
    const choices = [
        answer, // 정답
        baseIP.replace('.0', `.${Math.floor(broadcastIP) - 16}`),
        baseIP.replace('.0', `.${Math.floor(broadcastIP) + 16}`),
        baseIP.replace('.0', `.255`)
    ];
    
    categories[categoryIndex].problems[currentProblemIndex].question = 
        `${baseIP}/24 네트워크를 FLSM방식을 이용하여 ${subnetCount}개의 Subnet으로 나누고 IP Subnet-zero를 적용했다. 이 때 서브네팅된 네트워크 중 ${whichNetwork}번째 네트워크의 broadcast IP주소는?\n\n1. ${choices[0]}\n2. ${choices[1]}\n3. ${choices[2]}\n4. ${choices[3]}`;
    
    categories[categoryIndex].problems[currentProblemIndex].answer = answer;
}

// 9번: 사용 가능한 마지막 IP 주소
function generateUsableLastIPProblem(categoryIndex) {
    // 네트워크 주소 생성
    const octet3 = Math.floor(Math.random() * 200) + 50;
    
    // 서브넷 마스크 선택 (/26, /27, /28)
    const maskOptions = [192, 224, 240];
    const mask = maskOptions[Math.floor(Math.random() * maskOptions.length)];
    const blockSize = 256 - mask;
    
    // 네트워크 블록 계산 (128, 192 등)
    const networkBlock = Math.floor(Math.random() * (256 / blockSize)) * blockSize;
    
    const networkIP = `192.168.${octet3}.${networkBlock}`;
    const subnetMask = `255.255.255.${mask}`;
    
    // 브로드캐스트 주소
    const broadcastIP = networkBlock + blockSize - 1;
    // 마지막 사용가능 IP
    const lastUsableIP = broadcastIP - 1;
    
    const answer = `192.168.${octet3}.${lastUsableIP}`;
    
    // 선택지 생성
    const choices = [
        `192.168.${octet3}.${networkBlock + 1}`,
        answer, // 정답
        `192.168.${octet3}.${broadcastIP}`,
        `192.168.${octet3}.255`
    ];
    
    categories[categoryIndex].problems[currentProblemIndex].question = 
        `네트워크주소가 '${networkIP}'이며, 서브넷마스크가 '${subnetMask}'인 네트워크가 있다. 이 네트워크에서 사용 가능한 마지막 IP주소는 무엇인가?\n\n1. ${choices[0]}\n2. ${choices[1]}\n3. ${choices[2]}\n4. ${choices[3]}`;
    
    categories[categoryIndex].problems[currentProblemIndex].answer = answer;
}

// 10번: 브로드캐스트 주소 계산
function generateBroadcastAddressProblem(categoryIndex) {
    // IP 주소 생성
    const octet3 = Math.floor(Math.random() * 200) + 50;
    
    // 서브넷 마스크 선택
    const maskOptions = [192, 224, 240];
    const mask = maskOptions[Math.floor(Math.random() * maskOptions.length)];
    const blockSize = 256 - mask;
    
    // 랜덤 IP 생성 (블록 중간에 위치)
    const networkStart = Math.floor(Math.random() * (256 / blockSize)) * blockSize;
    const randomOffset = 10 + Math.floor(Math.random() * (blockSize - 15));
    const ipAddress = networkStart + randomOffset;
    
    // 브로드캐스트 계산
    const broadcastIP = networkStart + blockSize - 1;
    
    const ip = `192.168.${octet3}.${ipAddress}`;
    const subnetMask = `255.255.255.${mask}`;
    const answer = `192.168.${octet3}.${broadcastIP}`;
    
    // 선택지 생성
    const choices = [
        `192.168.${octet3}.255`,
        `192.168.${octet3}.${networkStart + blockSize / 2 - 1}`,
        `192.168.${octet3}.${networkStart + blockSize - 1 - blockSize}`,
        answer // 정답
    ];
    
    categories[categoryIndex].problems[currentProblemIndex].question = 
        `다음 조건일 때 사용되는 브로드캐스트 주소로 알맞은 것은?\n\nIP주소: ${ip}\n서브넷마스크 값: ${subnetMask}\n\n1. ${choices[0]}\n2. ${choices[1]}\n3. ${choices[2]}\n4. ${choices[3]}`;
    
    categories[categoryIndex].problems[currentProblemIndex].answer = answer;
}

// 11번: 서브넷 비트 수 계산 (CIDR 표기)
function generateSubnetBitsCountProblem(categoryIndex) {
    // 기본 네트워크
    const baseOctet = 100 + Math.floor(Math.random() * 100);
    const baseIP = `${baseOctet}.${baseOctet}.${baseOctet}.0/24`;
    
    // 필요한 서브넷 개수 (6~14개)
    const requiredSubnets = 6 + Math.floor(Math.random() * 9);
    // 필요한 호스트 개수 (15~25개)
    const requiredHosts = 15 + Math.floor(Math.random() * 11);
    
    // 서브넷 비트 계산
    const subnetBits = Math.ceil(Math.log2(requiredSubnets));
    // 호스트 비트 계산
    const hostBits = Math.ceil(Math.log2(requiredHosts + 2));
    
    // CIDR 표기
    const cidr = 24 + subnetBits;
    const answer = cidr.toString();
    
    // 선택지 생성
    const choices = [
        (cidr - 2).toString(),
        (cidr - 1).toString(),
        answer, // 정답
        (cidr + 1).toString()
    ];
    
    categories[categoryIndex].problems[currentProblemIndex].question = 
        `네트워크 관리자인 A씨는 ISP로부터 ${baseIP}를 할당 받았다. 네트워크의 효율성을 위하여 최소 ${requiredSubnets}개의 서브넷으로 분리하여 네트워크를 구성하되, 각 네트워크에는 최소 ${requiredHosts}대 이상의 호스트가 존재할 수 있도록 네트워크를 구성하고자 한다. 이 때 사용해야하는 서브넷 비트의 수는 무엇인가?\n\n1. ${choices[0]}\n2. ${choices[1]}\n3. ${choices[2]}\n4. ${choices[3]}`;
    
    categories[categoryIndex].problems[currentProblemIndex].answer = answer;
}

// 12번: 유효한 서브넷 ID 찾기
function generateValidSubnetIDProblem(categoryIndex) {
    // A클래스 네트워크
    const baseOctet = 10 + Math.floor(Math.random() * 20);
    const baseIP = `${baseOctet}.0.0.0`;
    
    // 서브넷 마스크 선택 (두 번째 옥텟)
    const maskOptions = [240, 248, 224, 192];
    const mask = maskOptions[Math.floor(Math.random() * maskOptions.length)];
    const subnetMask = `255.${mask}.0.0`;
    
    // 블록 크기 계산
    const blockSize = 256 - mask;
    
    // 유효한 서브넷 ID (blockSize의 배수)
    const validMultiple = 1 + Math.floor(Math.random() * 3); // 1~3배
    const validSubnetID = `${baseOctet}.${blockSize * validMultiple}.0.0`;
    
    // 선택지 생성
    const choices = [
        validSubnetID, // 정답
        `${baseOctet}.0.0.${blockSize}`,
        `${baseOctet}.${blockSize - 16}.16.3`,
        `${baseOctet}.${blockSize * 2 - 16}.240.0`
    ];
    
    categories[categoryIndex].problems[currentProblemIndex].question = 
        `${baseIP} 네트워크 전체에서 마스크 값으로 ${subnetMask}를 사용할 경우 유효한 서브넷 ID는?\n\n1. ${choices[0]}\n2. ${choices[1]}\n3. ${choices[2]}\n4. ${choices[3]}`;
    
    categories[categoryIndex].problems[currentProblemIndex].answer = validSubnetID;
}

// 13번: 서로 다른 서브넷을 위한 마스크
function generateDifferentSubnetMaskProblem(categoryIndex) {
    // 기본 네트워크
    const baseOctet = 192;
    const secondOctet = 168;
    const thirdOctet = Math.floor(Math.random() * 255);
    
    // 첫 번째 IP (작은 값)
    const firstIP = 1 + Math.floor(Math.random() * 30);
    // 두 번째 IP (큰 값, 32~96 사이)
    const secondIP = 32 + Math.floor(Math.random() * 65);
    
    const ipA = `${baseOctet}.${secondOctet}.${thirdOctet}.${firstIP}`;
    const ipB = `${baseOctet}.${secondOctet}.${thirdOctet}.${secondIP}`;
    
    // 두 IP를 분리할 수 있는 최소 마스크 계산
    const diff = secondIP - firstIP;
    let requiredBlockSize = 32;
    while (requiredBlockSize < diff) {
        requiredBlockSize *= 2;
    }
    
    // 마스크 계산
    const maskValue = 256 - requiredBlockSize;
    const correctMask = `255.255.255.${maskValue}`;
    
    // 선택지 생성
    const choices = [
        `0.0.0.0`,
        `255.255.255.0`,
        correctMask, // 정답
        `255.255.255.${maskValue - 64}`
    ];
    
    categories[categoryIndex].problems[currentProblemIndex].question = 
        `IPv4주소체계 기반의 어떤 네트워크상에서 두 컴퓨터 A,B가 각각 ${ipA}과 ${ipB}의 주소를 사용할 때 이 두 컴퓨터가 서로 다른 서브넷(Subnet)상에 존재하기 위해 사용해야 하는 서브넷 마스크(subnet Mask)로 가장 옳은 것은?\n\n1. ${choices[0]}\n2. ${choices[1]}\n3. ${choices[2]}\n4. ${choices[3]}`;
    
    categories[categoryIndex].problems[currentProblemIndex].answer = correctMask;
}

// 배열 섞기 헬퍼 함수
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}
// ========================== 서브넷/네트워크 알고리즘 끝 ==========================

// ========================== Java 알고리즘 시작 ==========================

// 1번 문제: 배열과 메소드 (참조 전달)
function generateJavaProblem1(categoryIndex) {
    const letters = ['A', 'B', 'C', 'D', 'E', 'F'];
    const idx1 = Math.floor(Math.random() * letters.length);
    const idx2 = Math.floor(Math.random() * letters.length);
    const letter1 = letters[idx1];
    const letter2 = letters[idx2];
    
    const code = `public class Main {\n    public static void change(String[] data, String s){\n        data[0] = s;\n        s = "Z";\n    }\n    \n    public static void main(String[] args) {\n        String data[] = { "${letter1}" };\n        String s = "${letter2}";\n        \n        change(data, s);\n        System.out.print(data[0] + s);\n    }\n}`;
    
    const answer = letter2 + letter2;
    
    categories[categoryIndex].problems[0].question = `다음 Java 코드의 출력값을 작성하시오.\n\n${code}`;
    categories[categoryIndex].problems[0].answer = answer;
}

// 2번 문제: 람다와 예외처리
function generateJavaProblem2(categoryIndex) {
    const threshold = 2 + Math.floor(Math.random() * 3);
    const applyVal = threshold + Math.floor(Math.random() * 2);
    const exceptionReturn = 5 + Math.floor(Math.random() * 5);
    const addVal = 5 + Math.floor(Math.random() * 10);
    
    const result1 = applyVal > threshold ? exceptionReturn : applyVal * 2;
    const result2 = applyVal + addVal;
    
    const code = `public class Main {\n \n    static interface F {\n        int apply(int x) throws Exception;\n    }\n \n    public static int run(F f) {\n        try {\n            return f.apply(${applyVal});\n        } catch (Exception e) {\n            return ${exceptionReturn};\n        }\n    }\n \n    public static void main(String[] args) {\n \n        F f = (x) -> {\n            if (x > ${threshold}) {\n                throw new Exception();\n            }\n            return x * 2;\n        };\n \n        System.out.print(run(f) + run((int n) -> n + ${addVal}));\n    }\n \n}`;
    
    categories[categoryIndex].problems[1].question = `다음 Java 코드의 출력값을 작성하시오.\n\n${code}`;
    categories[categoryIndex].problems[1].answer = (result1 + result2).toString();
}

// 3번 문제: 상속과 오버라이딩
function generateJavaProblem3(categoryIndex) {
    const addVal1 = 2 + Math.floor(Math.random() * 3);
    const addVal2 = 3 + Math.floor(Math.random() * 3);
    const inputVal = 2 + Math.floor(Math.random() * 5);
    const letters = ['P', 'Q', 'R'];
    const letter = letters[Math.floor(Math.random() * letters.length)];
    
    const result = inputVal + addVal2;
    
    const code = `public class Main{\n \n    public static class Parent {\n \n        public int x(int i) { return i + ${addVal1}; }\n        public static String id() { return "${letter}";}\n        \n    }\n \n    public static class Child extends Parent {\n        \n        public int x(int i) { return i + ${addVal2}; }\n        public String x(String s) { return s + "R"; }\n        public static String id() { return "C"; }\n        \n    }\n \n    public static void main(String[] args) {\n \n        Parent ref = new Child();\n        System.out.println(ref.x(${inputVal}) + ref.id());\n        \n    }\n    \n}`;
    
    categories[categoryIndex].problems[2].question = `다음 Java 코드의 출력값을 작성하시오.\n\n${code}`;
    categories[categoryIndex].problems[2].answer = result + letter;
}

// 4번 문제: 객체 배열과 참조
function generateJavaProblem4(categoryIndex) {
    const val1 = 1 + Math.floor(Math.random() * 3);
    const val2 = 4 + Math.floor(Math.random() * 3);
    const val3 = 7 + Math.floor(Math.random() * 3);
    
    const code = `public class Main{\n    public static class BO {\n        public int v;\n        public BO(int v) {\n            this.v = v;\n        }\n    }\n    public static void main(String[] args) {\n        BO a = new BO(${val1});\n        BO b = new BO(${val2});\n        BO c = new BO(${val3});\n        BO[] arr = {a, b, c};\n        BO t = arr[0];\n        arr[0] = arr[2];\n        arr[2] = t;\n        arr[1].v = arr[0].v;\n        System.out.println(a.v + "a" + b.v + "b" + c.v);\n    }\n}`;
    
    const answer = `${val1}a${val3}b${val3}`;
    
    categories[categoryIndex].problems[3].question = `다음 Java 코드의 출력값을 작성하시오.\n\n${code}`;
    categories[categoryIndex].problems[3].answer = answer;
}

// 5번 문제: 스위치와 반복문
function generateJavaProblem5(categoryIndex) {
    const initA = 0;
    const initB = 1;
    const loopEnd = 4 + Math.floor(Math.random() * 3);
    
    let a = initA;
    let b = initB;
    
    for(let i = 0; i <= loopEnd; i++) {
        if(i % 2 === 0) {
            a += i;
        } else {
            b += i;
        }
    }
    
    const code = `public class Main {\n \n    public static void main(String[] args) {\n        int a = ${initA};\n        int b = ${initB};\n        \n        for (int i = 0; i <= ${loopEnd}; i++) {\n            switch(i % 2){\n                case 0:\n                    a += i;\n                    break;\n                case 1:\n                    b += i;\n                    break;\n            }\n        }\n        \n        System.out.printf("%d %d", a, b);\n    }\n}`;
    
    categories[categoryIndex].problems[4].question = `다음 Java 코드의 출력값을 작성하시오.\n\n${code}`;
    categories[categoryIndex].problems[4].answer = `${a} ${b}`;
}

// 6번 문제: 클래스와 상속
function generateJavaProblem6(categoryIndex) {
    const inputVal = 3 + Math.floor(Math.random() * 5);
    const result = (inputVal + 1) * inputVal;
    
    const code = `class Parent {\n    int x, y;\n \n    Parent(int x, int y) {\n        this.x=x;\n        this.y=y;\n    }\n \n    int getT() {\n        return x*y;\n    }\n}\n \nclass Child extends Parent {\n    int x;\n \n    Child (int x) {\n        super(x+1, x);\n        this.x=x;\n    }\n \n    int getT(int n){\n        return super.getT()+n;\n    }\n}\n \nclass Main {\n    public static void main(String[] args) {\n        Parent parent = new Child(${inputVal});\n        System.out.println(parent.getT());\n    }\n}`;
    
    categories[categoryIndex].problems[5].question = `다음 Java 코드의 출력값을 작성하시오.\n\n${code}`;
    categories[categoryIndex].problems[5].answer = result.toString();
}

// 7번 문제: 메소드 오버라이딩
function generateJavaProblem7(categoryIndex) {
    const inputVal = 5 + Math.floor(Math.random() * 10);
    const po = 3 + Math.floor(Math.random() * 3);
    const result = po * po;
    
    const code = `class classOne {\n    int a, b;\n \n    public classOne(int a, int b) {\n        this.a = a;\n        this.b = b;\n    }\n \n    public void print() {\n        System.out.println(a + b);\n    }\n \n}\nclass classTwo extends classOne {\n    int po = ${po};\n    \n    public classTwo(int i) {\n        super(i, i+1);\n    }\n \n    public void print() {\n        System.out.println(po*po);\n    }\n}\n \npublic class main {  \n    public static void main(String[] args) {\n        classOne one = new classTwo(${inputVal});\n        one.print();\n    }\n}`;
    
    categories[categoryIndex].problems[6].question = `다음 Java 코드의 출력값을 작성하시오.\n\n${code}`;
    categories[categoryIndex].problems[6].answer = result.toString();
}

// 8번 문제: 배열 탐색 (10진수 -> 2진수)
function generateJavaProblem8(categoryIndex) {
    const n = 5 + Math.floor(Math.random() * 20);
    
    let binary = '';
    let temp = n;
    while(temp > 0) {
        binary = (temp % 2) + binary;
        temp = Math.floor(temp / 2);
    }
    
    const reversedBinary = binary.split('').reverse().join('') + '0'.repeat(8 - binary.length);
    
    const code = `public class Main {\n    public static void main(String[] args){\n        int[]a = new int[8];\n        int i = 0;\n        int n = ${n};\n        while (n>0) {\n            a[i++] = n%2;\n            n/=2;\n        }\n        for (int k=0; k<i; k++){\n            System.out.print(a[k]);\n        }\n    }\n}`;
    
    categories[categoryIndex].problems[7].question = `다음 Java 코드의 출력값을 작성하시오.\n\n${code}`;
    categories[categoryIndex].problems[7].answer = binary.split('').reverse().join('');
}

// 9번 문제: 추상 클래스
function generateJavaProblem9(categoryIndex) {
    const names = ['Spark', 'Avante', 'Sonata', 'K5', 'Genesis'];
    const name = names[Math.floor(Math.random() * names.length)];
    
    const code = `abstract class Vehicle{\n    String name;\n    abstract public String getName(String n);\n    \n    public String getName(){\n        return "Vehicle name: " + name;\n    }\n}\n \nclass Car extends Vehicle{\n    public Car(String n){\n        name = n;\n    }\n    public String getName(String n){\n        return "Car name: " + n;\n    }\n    public String getName(byte[] n){\n        return "Car name: " + n;\n    }\n}\n \npublic class Main {\n    public static void main(String[] args){\n        Vehicle obj = new Car("${name}");\n        System.out.print(obj.getName());\n    }\n}`;
    
    categories[categoryIndex].problems[8].question = `다음 Java 코드의 출력값을 작성하시오.\n\n${code}`;
    categories[categoryIndex].problems[8].answer = `Vehicle name: ${name}`;
}

// 10번 문제: 문자열 처리
function generateJavaProblem10(categoryIndex) {
    const strings = ['Programming', 'Information', 'Javascript', 'Development', 'Engineering'];
    const str = strings[Math.floor(Math.random() * strings.length)];
    const start = 1 + Math.floor(Math.random() * 3);
    const end = start + 3 + Math.floor(Math.random() * 3);
    
    const result = str.substring(start, Math.min(end, str.length));
    
    const code = `public class Main {\n    public static void main(String[] args) {\n        String str = "${str}";\n        System.out.println(str.substring(${start},${end}));\n    }\n}`;
    
    categories[categoryIndex].problems[9].question = `다음 Java 코드의 출력값을 작성하시오.\n\n${code}`;
    categories[categoryIndex].problems[9].answer = result;
}

// 11번 문제: 스위치문
function generateJavaProblem11(categoryIndex) {
    const i = 2 + Math.floor(Math.random() * 4);
    const k = 1;
    
    let result = k;
    switch(i) {
        case 0:
        case 1:
        case 2:
        case 3: result = 0;
        case 4: result += 3;
        case 5: result -= 10;
        default: result--;
    }
    
    const code = `public class Main {\n    public static void main(String[] args) {\n        int i = ${i};\n        int k = ${k};\n        switch(i) {\n            case 0:\n            case 1:\n            case 2:\n            case 3: k=0;\n            case 4: k+=3;\n            case 5: k-=10;\n            default: k--;\n        }\n        System.out.print(k);\n    }\n}`;
    
    categories[categoryIndex].problems[10].question = `다음 Java 코드의 출력값을 작성하시오.\n\n${code}`;
    categories[categoryIndex].problems[10].answer = result.toString();
}

// 12번 문제: 싱글톤 패턴
function generateJavaProblem12(categoryIndex) {
    const callCount = 2 + Math.floor(Math.random() * 4);
    
    const code = `class Connection {\n    private static Connection _inst = null;\n    private int count = 0;\n    \n    public static Connection get() {\n        if(_inst == null) {\n            _inst = new Connection();\n            return _inst;\n        }\n        return _inst;\n    }\n    \n    public void count() { count++; }\n    public int getCount() { return count; }\n}\n \npublic class Main {\n    public static void main(String[] args) {\n${Array.from({length: callCount}, (_, i) => `        Connection conn${i+1} = Connection.get();\n        conn${i+1}.count();`).join('\n')}\n        System.out.print(conn1.getCount());\n    }\n}`;
    
    categories[categoryIndex].problems[11].question = `다음 Java 코드의 출력값을 작성하시오.\n\n${code}`;
    categories[categoryIndex].problems[11].answer = callCount.toString();
}

// 13번 문제: 인터페이스
function generateJavaProblem13(categoryIndex) {
    const name = ['Kim', 'Lee', 'Park', 'Choi'][Math.floor(Math.random() * 4)];
    const age = 18 + Math.floor(Math.random() * 10);
    const subtract = 2 + Math.floor(Math.random() * 3);
    
    const code = `interface Studentinterface {\n    public abstract void printName(String name);\n    \n    default void printAge(int age) {\n        System.out.println("age: " + age);\n    }\n}\n \nclass StudentClass implements Studentinterface {\n    public void printName(String name) {\n        System.out.println("name: " + name);\n    }\n \n    public void printAge(int age) {\n        System.out.println("age: " + (age-${subtract}));\n    }\n}\n \npublic class Main {\n    public static void main(String[] args) {\n        StudentClass st = new StudentClass();\n        st.printName("${name}");\n        st.printAge(${age});\n    }\n}`;
    
    categories[categoryIndex].problems[12].question = `다음 Java 코드의 출력값을 작성하시오.\n\n${code}`;
    categories[categoryIndex].problems[12].answer = `name: ${name}\\nage: ${age - subtract}`;
}

// 14번 문제: 재귀함수
function generateJavaProblem14(categoryIndex) {
    const num = 3 + Math.floor(Math.random() * 4);
    
    function compute(n) {
        if(n <= 1) return n;
        return compute(n - 1) + compute(n - 3);
    }
    
    const result = compute(num);
    
    const code = `class Parent {\n    public int compute(int num) {\n        if(num <= 1) return num;\n        return compute(num - 1) + compute(num - 2);\n    }\n}\n \nclass Child extends Parent {\n    public int compute(int num) {\n        if(num <= 1) return num;\n        return compute(num - 1) + compute(num - 3);\n    }\n}\n \npublic class Main {\n    public static void main(String args[]) {\n        Parent obj = new Child();\n        System.out.print(obj.compute(${num}));\n    }\n}`;
    
    categories[categoryIndex].problems[13].question = `다음 Java 코드의 출력값을 작성하시오.\n\n${code}`;
    categories[categoryIndex].problems[13].answer = result.toString();
}

// 15번 문제: 2차원 배열
function generateJavaProblem15(categoryIndex) {
    const size = 3 + Math.floor(Math.random() * 4); // 3~6 범위로 확장
    
    // a[row][col] 위치를 랜덤으로 선택
    const row1 = Math.floor(Math.random() * (size - 1)) + 1; // 1 ~ size-1
    const col1 = Math.floor(Math.random() * (size - 1)) + 1; // 1 ~ size-1
    
    // 두 번째 위치는 첫 번째와 다르게
    let row2, col2;
    do {
        row2 = Math.floor(Math.random() * (size - 1)) + 1;
        col2 = Math.floor(Math.random() * (size - 1)) + 1;
    } while (row1 === row2 && col1 === col2); // 같은 위치 방지
    
    // 배열 값 계산: a[i][j] = (i * size) + j + 1
    const val1 = (row1 * size) + col1 + 1;
    const val2 = (row2 * size) + col2 + 1;
    const result = val1 + val2;
    
    const code = `public class Main {\n    public static void main(String[] args) {\n        int[][] a = new int[${size}][${size}];\n        int n=1;\n        for(int i=0; i<${size}; i++) {\n            for(int j=0; j<${size}; j++) {\n                a[i][j]=n++;\n            }\n        }\n        System.out.print(a[${row1}][${col1}]+a[${row2}][${col2}]);\n    }\n}`;
    
    categories[categoryIndex].problems[14].question = `다음 Java 코드의 출력값을 작성하시오.\n\n${code}`;
    categories[categoryIndex].problems[14].answer = result.toString();
}

// 16번 문제: super 키워드
function generateJavaProblem16(categoryIndex) {
    const inputVal = 5 + Math.floor(Math.random() * 15);
    const result = inputVal + 1;
    
    const code = `class A {\n    int a;\n    public A(int a) {\n        this.a = a;\n    }\n    void display() {\n        System.out.println("a=" + a);\n    }\n}\n \nclass B extends A {\n    public B(int a) {\n        super(a);\n        super.a = a + 1;\n    }\n}\n \npublic class Main {\n    public static void main(String[] args) {\n        B obj = new B(${inputVal});\n        obj.display();\n    }\n}`;
    
    categories[categoryIndex].problems[15].question = `다음 Java 코드의 출력값을 작성하시오.\n\n${code}`;
    categories[categoryIndex].problems[15].answer = `a=${result}`;
}

// ========================== Java 알고리즘 끝 ==========================

// ========================== 페이지 교체 알고리즘 문제 생성 함수들 ==========================

// 1번 문제: 2024년 3회 기출 - LRU 페이지 부재 횟수
function generatePageProblem1(categoryIndex) {
    const frameCount = 3;
    const pages = [];
    
    // 20개의 랜덤 페이지 생성
    for (let i = 0; i < 20; i++) {
        pages.push(Math.floor(Math.random() * 8));
    }
    
    const faults = simulateLRU(pages, frameCount);
    
    categories[categoryIndex].problems[currentProblemIndex].question = 
        `LRU 페이지 교체 알고리즘에 따른 페이지 부재 횟수를 작성하시오. (프레임 ${frameCount}개)\n\n페이지 참조 순서: ${pages.join(' ')}`;
    
    categories[categoryIndex].problems[currentProblemIndex].answer = faults.toString();
}

// 2번 문제: 2024년 1회 기출 - LRU와 LFU 비교
function generatePageProblem2(categoryIndex) {
    const frameCount = 3;
    const pages = [];
    
    // 10개의 랜덤 페이지 생성
    for (let i = 0; i < 10; i++) {
        pages.push(Math.floor(Math.random() * 8) + 1);
    }
    
    const lruFaults = simulateLRU(pages, frameCount);
    const lfuFaults = simulateLFU(pages, frameCount);
    
    categories[categoryIndex].problems[currentProblemIndex].question = 
        `다음은 운영체제 페이지 순서를 참고하여 할당된 프레임의 수가 ${frameCount}개일 때 LRU와 LFU 알고리즘의 페이지 부재 횟수를 작성하시오.\n\n페이지 참조 순서: ${pages.join(', ')}\n\n(1) LRU: \n(2) LFU:`;
    
    categories[categoryIndex].problems[currentProblemIndex].answer = 
        `(1) LRU: ${lruFaults}\n(2) LFU: ${lfuFaults}`;
}

// 3번 문제: 연습 문제 - FIFO 페이지 부재 횟수
function generatePageProblem3(categoryIndex) {
    const frameCount = 3;
    const pages = [];
    
    // 12개의 랜덤 페이지 생성
    for (let i = 0; i < 12; i++) {
        pages.push(Math.floor(Math.random() * 6) + 1);
    }
    
    const faults = simulateFIFO(pages, frameCount);
    
    categories[categoryIndex].problems[currentProblemIndex].question = 
        `FIFO 페이지 교체 알고리즘에 따른 페이지 부재 횟수를 작성하시오. (프레임 ${frameCount}개)\n\n페이지 참조 순서: ${pages.join(' ')}`;
    
    categories[categoryIndex].problems[currentProblemIndex].answer = faults.toString();
}

// 4번 문제: FIFO 최종상태 ✅ 진짜 제대로 수정
function generatePageProblem4(categoryIndex) {
    const frameCount = 3;
    const pages = [];
    
    // 7개의 랜덤 페이지 생성 (0~4 사이)
    for (let i = 0; i < 7; i++) {
        pages.push(Math.floor(Math.random() * 5));
    }
    
    const result = simulateFIFODetailed(pages, frameCount);
    const finalFrames = result.finalFrames;  // 배열: [2, 4, 3]
    const correctAnswer = finalFrames.join(',');  // "2,4,3"
    
    // 🔥 오답 보기 생성: 정답과 완전히 다른 값들로 만들기
    const wrongChoices = [];
    const maxAttempts = 100;
    let attempts = 0;
    
    while (wrongChoices.length < 3 && attempts < maxAttempts) {
        attempts++;
        
        const wrong = [
            Math.floor(Math.random() * 5),
            Math.floor(Math.random() * 5),
            Math.floor(Math.random() * 5)
        ];
        
        const wrongStr = wrong.join(',');
        
        // 정답과 다르고, 중복도 아닌지 확인
        if (wrongStr !== correctAnswer && !wrongChoices.includes(wrongStr)) {
            wrongChoices.push(wrongStr);
        }
    }
    
    // 충분한 오답 생성 실패 시 강제 생성
    while (wrongChoices.length < 3) {
        const filler = `${Math.floor(Math.random() * 5)},${Math.floor(Math.random() * 5)},${Math.floor(Math.random() * 5)}`;
        if (!wrongChoices.includes(filler) && filler !== correctAnswer) {
            wrongChoices.push(filler);
        }
    }
    
    // ✅ 보기 배열 생성 (정답 + 오답 3개)
    const allChoices = [correctAnswer, wrongChoices[0], wrongChoices[1], wrongChoices[2]];
    
    // 🔥 보기 섞기!
    shuffleArray(allChoices);
    
    // 🔥 섞인 후 정답이 몇 번 보기인지 찾기
    const correctIndex = allChoices.indexOf(correctAnswer) + 1;  // 1, 2, 3, 4 중 하나
    
    categories[categoryIndex].problems[currentProblemIndex].question = 
        `3개의 페이지 프레임을 갖는 시스템에서 페이지 참조 순서가 ${pages.join(',')} 일 경우 FIFO 알고리즘에 의한 페이지 교체의 경우 프레임의 최종상태는?\n1. ${allChoices[0]}\n2. ${allChoices[1]}\n3. ${allChoices[2]}\n4. ${allChoices[3]}`;
    
    categories[categoryIndex].problems[currentProblemIndex].answer = correctIndex.toString();
}

// 5번 문제: FIFO 페이지 부재 횟수 ✅ 수정됨
function generatePageProblem5(categoryIndex) {
    const frameCount = 3;
    const pages = [];
    
    // 12개의 랜덤 페이지 생성
    for (let i = 0; i < 12; i++) {
        pages.push(Math.floor(Math.random() * 6) + 1);
    }
    
    const faults = simulateFIFO(pages, frameCount);
    
    // 🔥 정답을 3번 보기에 고정
    const choices = [
        faults - 2,
        faults - 1,
        faults,  // ✅ 정답
        faults + 1
    ];
    
    const correctAnswer = '3';  // ✅ 항상 3번이 정답
    
    categories[categoryIndex].problems[currentProblemIndex].question = 
        `3개의 페이지 프레임을 가진 기억장치에서 페이지 요청을 다음과 같은 페이지 번호 순으로 요청했을 때 교체 알고리즘으로 FIFO방법을 사용한다면 몇번의 페이지 부재가 발생하는가? (단, 현재 기억장치는 모두 비어 있다고 가정한다.)\n요청된 페이지 번호의 순서 : ${pages.join(',')}\n1. ${choices[0]}번\n2. ${choices[1]}번\n3. ${choices[2]}번\n4. ${choices[3]}번`;
    
    categories[categoryIndex].problems[currentProblemIndex].answer = correctAnswer;
}

// 6번 문제: FIFO 페이지 결함 ✅ 수정됨
function generatePageProblem6(categoryIndex) {
    const frameCount = 3;
    const pages = [];
    
    // 9개의 랜덤 페이지 생성
    for (let i = 0; i < 9; i++) {
        pages.push(Math.floor(Math.random() * 6) + 1);
    }
    
    const faults = simulateFIFO(pages, frameCount);
    
    // 🔥 정답을 3번 보기에 고정
    const choices = [
        faults - 2,
        faults - 1,
        faults,  // ✅ 정답
        faults + 1
    ];
    
    const correctAnswer = '3';  // ✅ 항상 3번이 정답
    
    categories[categoryIndex].problems[currentProblemIndex].question = 
        `3개의 페이지를 수용할 수 있는 주기억장치가 있으며, 초기에는 모두 비어 있다고 가정한다. 다음의 순서로 페이지 참조가 발생할 때, FIFO 페이지 교체 알고리즘을 사용할 경우 몇 번의 페이지 결함이 발생하는가?\n페이지 참조 순서 : ${pages.join(',')}\n1. ${choices[0]}\n2. ${choices[1]}\n3. ${choices[2]}\n4. ${choices[3]}`;
    
    categories[categoryIndex].problems[currentProblemIndex].answer = correctAnswer;
}

// 7번 문제: LRU 페이지 결함 ✅ 수정됨
function generatePageProblem7(categoryIndex) {
    const frameCount = 3;
    const pages = [];
    
    // 10개의 랜덤 페이지 생성
    for (let i = 0; i < 10; i++) {
        pages.push(Math.floor(Math.random() * 6) + 1);
    }
    
    const faults = simulateLRU(pages, frameCount);
    
    // 🔥 정답을 3번 보기에 고정
    const choices = [
        faults - 2,
        faults - 1,
        faults,  // ✅ 정답
        faults + 1
    ];
    
    const correctAnswer = '3';  // ✅ 항상 3번이 정답
    
    categories[categoryIndex].problems[currentProblemIndex].question = 
        `3개의 페이지를 수용할 수 있는 주기억장치가 있으며, 초기에는 모두 비어 있다고 가정한다. 다음의 순서로 페이지 참조가 발생할 때, LRU페이지 교체 알고리즘을 사용할 경우 몇 번의 페이지 결함이 발생하는가?\n페이지 참조 순서 : ${pages.join(',')}\n1. ${choices[0]}\n2. ${choices[1]}\n3. ${choices[2]}\n4. ${choices[3]}`;
    
    categories[categoryIndex].problems[currentProblemIndex].answer = correctAnswer;
}

// 8번 문제: LRU 최종 결과 ✅ 수정됨
function generatePageProblem8(categoryIndex) {
    const frameCount = 3;
    const pages = [];
    
    // 7개의 랜덤 페이지 생성
    for (let i = 0; i < 7; i++) {
        pages.push(Math.floor(Math.random() * 5));
    }
    
    const result = simulateLRUDetailed(pages, frameCount);
    const finalFrames = result.finalFrames.join(',');
    
    // 🔥 정답을 2번 보기에 고정
    const choices = [
        `${pages[0]},${pages[1]},${Math.floor(Math.random() * 5)}`,
        finalFrames,  // ✅ 정답
        `${Math.floor(Math.random() * 5)},${pages[pages.length-1]},${pages[1]}`,
        `${pages[pages.length-2]},${pages[0]},${pages[2]}`
    ];
    
    const correctAnswer = '2';  // ✅ 항상 2번이 정답
    
    categories[categoryIndex].problems[currentProblemIndex].question = 
        `3개의 페이지 프레임을 갖는 시스템에서 페이지 참조 순서가 ${pages.join(',')} 일 경우 LRU 알고리즘에 의한 페이지 대치의 최종 결과는?\n1. ${choices[0]}\n2. ${choices[1]}\n3. ${choices[2]}\n4. ${choices[3]}`;
    
    categories[categoryIndex].problems[currentProblemIndex].answer = correctAnswer;
}

// 9번 문제: LRU 4개 프레임 ✅ 수정됨
function generatePageProblem9(categoryIndex) {
    const frameCount = 4;
    const pages = [];
    
    // 9개의 랜덤 페이지 생성
    for (let i = 0; i < 9; i++) {
        pages.push(Math.floor(Math.random() * 6) + 1);
    }
    
    const faults = simulateLRU(pages, frameCount);
    
    // 🔥 정답을 3번 보기에 고정
    const choices = [
        `${faults - 2}회`,
        `${faults - 1}회`,
        `${faults}회`,  // ✅ 정답
        `${faults + 1}회`
    ];
    
    const correctAnswer = '3';  // ✅ 항상 3번이 정답
    
    categories[categoryIndex].problems[currentProblemIndex].question = 
        `4개의 페이지를 수용할 수 있는 주기억장치가 있으며, 초기에는 모두 비어 있다고 가정한다. 다음의 순서로 페이지 참조가 발생할 때, LRU 페이지 교체 알고리즘을 사용할 경우 몇 번의 페이지 결함이 발생하는가?\n페이지 참조 순서 : ${pages.join(',')}\n1. ${choices[0]}\n2. ${choices[1]}\n3. ${choices[2]}\n4. ${choices[3]}`;
    
    categories[categoryIndex].problems[currentProblemIndex].answer = correctAnswer;
}

// 10번 문제: LFU 페이지 부재 ✅ 수정됨
function generatePageProblem10(categoryIndex) {
    const frameCount = 3;
    const pages = [];
    
    // 11개의 랜덤 페이지 생성
    for (let i = 0; i < 11; i++) {
        pages.push(Math.floor(Math.random() * 5) + 1);
    }
    
    const faults = simulateLFU(pages, frameCount);
    
    // 🔥 정답을 3번 보기에 고정
    const choices = [
        `${faults - 2}회`,
        `${faults - 1}회`,
        `${faults}회`,  // ✅ 정답
        `${faults + 1}회`
    ];
    
    const correctAnswer = '3';  // ✅ 항상 3번이 정답
    
    categories[categoryIndex].problems[currentProblemIndex].question = 
        `3개의 페이지 프레임으로 구성된 기억장치에서 다음과 같은 순서대로 페이지 요청이 일어날 때, 페이지 교체 알고리즘으로 LFU를 사용한다면 몇번의 페이지 부재가 발생하는가? (단, 초기 페이지 프레임은 비어있다고 가정한다.)\n요청된 페이지 번호의 순서 : ${pages.join(',')}\n1. ${choices[0]}\n2. ${choices[1]}\n3. ${choices[2]}\n4. ${choices[3]}`;
    
    categories[categoryIndex].problems[currentProblemIndex].answer = correctAnswer;
}

// 11번 문제: LFU 최종 결과 ✅ 수정됨
function generatePageProblem11(categoryIndex) {
    const frameCount = 4;
    const pages = [];
    
    // 8개의 랜덤 페이지 생성
    for (let i = 0; i < 8; i++) {
        pages.push(Math.floor(Math.random() * 6) + 1);
    }
    
    const result = simulateLFUDetailed(pages, frameCount);
    const finalFrames = result.finalFrames.join(',');
    
    // 🔥 정답을 2번 보기에 고정
    const choices = [
        `${pages[0]},${pages[1]},${pages[2]},${Math.floor(Math.random() * 6) + 1}`,
        finalFrames,  // ✅ 정답
        `${pages[1]},${pages[2]},${Math.floor(Math.random() * 6) + 1},${pages[pages.length-1]}`,
        `${Math.floor(Math.random() * 6) + 1},${pages[2]},${pages[3]},${pages[pages.length-2]}`
    ];
    
    const correctAnswer = '2';  // ✅ 항상 2번이 정답
    
    categories[categoryIndex].problems[currentProblemIndex].question = 
        `4개의 페이지 프레임으로 구성된 기억장치에서 다음과 같은 순서대로 페이지 요청이 일어날 때, 페이지 교체 알고리즘으로 LFU를 사용한다면 페이지 대치의 최종 결과는?(단, 초기 페이지 프레임은 비어있다고 가정한다.)\n요청된 페이지 번호의 순서 : ${pages.join(',')}\n1. ${choices[0]}\n2. ${choices[1]}\n3. ${choices[2]}\n4. ${choices[3]}`;
    
    categories[categoryIndex].problems[currentProblemIndex].answer = correctAnswer;
}
// ========================== 페이지 교체 알고리즘 끝 ==========================


// ========================== 프로세스 스케줄링 알고리즘 시작 ==========================

// 2번 문제: SRT 평균 반환시간
function generateProcessSchedule2(categoryIndex) {
    const processCount = 4;
    const processes = [];
    
    for (let i = 0; i < processCount; i++) {
        processes.push({
            name: `P${i + 1}`,
            arrival: i * 2,
            burst: 1 + Math.floor(Math.random() * 7)
        });
    }
    
    const result = simulateSRTScheduling(processes);
    const avgTurnaroundTime = result.avgTurnaround;
    
    const choices = [
        (avgTurnaroundTime - 2.75).toFixed(2),
        avgTurnaroundTime.toFixed(1),
        (avgTurnaroundTime + 1.75).toFixed(2),
        (avgTurnaroundTime + 3).toFixed(1)
    ];
    
    let tableHTML = '<table>\n<tr><th>프로세스</th><th>도착시간</th><th>실행시간</th></tr>\n';
    processes.forEach(p => {
        tableHTML += `<tr><td>${p.name}</td><td>${p.arrival}</td><td>${p.burst}</td></tr>\n`;
    });
    tableHTML += '</table>';
    
    categories[categoryIndex].problems[currentProblemIndex].question = 
        `다음 표는 단일 CPU에 진입한 프로세스의 도착 시간과 처리하는 데 필요한 실행 시간을 나타낸 것이다. 프로세스 간 문맥 교환에 따른 오버헤드는 무시한다고 할 때, SRT스케줄링 알고리즘을 사용한 경우 네 프로세스의 평균 반환시간은?\n\n${tableHTML}\n\n1. ${choices[0]}\n2. ${choices[1]}\n3. ${choices[2]}\n4. ${choices[3]}`;
    
    categories[categoryIndex].problems[currentProblemIndex].answer = avgTurnaroundTime.toFixed(1);
}

// 3번 문제: FCFS 평균 대기시간
function generateProcessSchedule3(categoryIndex) {
    const processCount = 3;
    const processes = [];
    
    for (let i = 0; i < processCount; i++) {
        processes.push({
            name: `P${i + 1}`,
            arrival: 0,
            burst: 3 + Math.floor(Math.random() * 20)
        });
    }
    
    const avgWaitTime = simulateFCFS(processes);
    
    const choices = [
        Math.max(0, Math.round(avgWaitTime - 2)),
        Math.max(0, Math.round(avgWaitTime - 1)),
        Math.round(avgWaitTime),
        Math.round(avgWaitTime + 1)
    ];
    
    let tableHTML = '<table>\n<tr><th>프로세스</th><th>버스트 시간(초)</th></tr>\n';
    processes.forEach(p => {
        tableHTML += `<tr><td>${p.name}</td><td>${p.burst}</td></tr>\n`;
    });
    tableHTML += '</table>';
    
    categories[categoryIndex].problems[currentProblemIndex].question = 
        `다음은 CPU에 서비스를 받으려고 도착한 순서대로 프로세스와 그 서비스 시간을 나타낸다. FCFS CPU Scheduling에 의해서 프로세스를 처리한다고 했을 경우 프로세스의 평균 대기시간은 얼마인가?\n\n${tableHTML}\n\n1. ${choices[0]}\n2. ${choices[1]}\n3. ${choices[2]}\n4. ${choices[3]}`;
    
    categories[categoryIndex].problems[currentProblemIndex].answer = `${Math.round(avgWaitTime)}`;
}

// 4번 문제: FCFS T-t 값
function generateProcessSchedule4(categoryIndex) {
    const processCount = 3;
    const processes = [];
    
    for (let i = 0; i < processCount; i++) {
        processes.push({
            name: `P${i + 1}`,
            burst: 3 + Math.floor(Math.random() * 10)
        });
    }
    
    const worstOrder = [...processes].sort((a, b) => b.burst - a.burst);
    let timeWorst = 0;
    let totalTurnaroundWorst = 0;
    worstOrder.forEach(p => {
        timeWorst += p.burst;
        totalTurnaroundWorst += timeWorst;
    });
    const T = totalTurnaroundWorst / processCount;
    
    const bestOrder = [...processes].sort((a, b) => a.burst - b.burst);
    let timeBest = 0;
    let totalTurnaroundBest = 0;
    bestOrder.forEach(p => {
        timeBest += p.burst;
        totalTurnaroundBest += timeBest;
    });
    const t = totalTurnaroundBest / processCount;
    
    const diff = Math.round(T - t);
    
    const choices = [
        Math.max(0, diff - 2),
        Math.max(0, diff - 1),
        diff,
        diff + 1
    ];
    
    let tableHTML = '<table>\n<tr><th>프로세스</th><th>실행시간</th></tr>\n';
    processes.forEach(p => {
        tableHTML += `<tr><td>${p.name}</td><td>${p.burst}</td></tr>\n`;
    });
    tableHTML += '</table>';
    
    categories[categoryIndex].problems[currentProblemIndex].question = 
        `다음과 같은 3개의 작업에 대하여 FCFS 알고리즘을 사용할 때, 임의의 작업 순서로 얻을 수 있는 최대 평균 반환 시간을 T, 최소 평균 반환 시간을 t라고 가정했을 경우 T-t의 값은?\n\n${tableHTML}\n\n1. ${choices[0]}\n2. ${choices[1]}\n3. ${choices[2]}\n4. ${choices[3]}`;
    
    categories[categoryIndex].problems[currentProblemIndex].answer = `${diff}`;
}

// 5번 문제: SJF 평균 실행시간 (테이블)
function generateProcessSchedule5(categoryIndex) {
    const processCount = 3;
    const processes = [];
    
    for (let i = 0; i < processCount; i++) {
        processes.push({
            name: `P${i + 1}`,
            arrival: 0,
            burst: 6 + Math.floor(Math.random() * 13)
        });
    }
    
    // 평균 실행시간 계산 (실행시간들의 평균)
    let totalBurstTime = 0;
    processes.forEach(p => {
        totalBurstTime += p.burst;
    });
    
    const avgBurstTime = Math.round(totalBurstTime / processCount);
    
    const choices = [
        Math.max(0, avgBurstTime - 1),
        avgBurstTime,
        avgBurstTime + 7,
        avgBurstTime + 13
    ];
    
    let tableHTML = '<table>\n<tr><th>프로세스</th><th>실행시간(초)</th></tr>\n';
    processes.forEach(p => {
        tableHTML += `<tr><td>${p.name}</td><td>${p.burst}</td></tr>\n`;
    });
    tableHTML += '</table>';
    
    categories[categoryIndex].problems[currentProblemIndex].question = 
        `다음과 같은 프로세스들이 차례로 준비상태 큐에 들어왔을 경우 SJF 스케줄링 기법을 이용하여 제출시간이 없는 경우의 평균 실행시간은?\n\n${tableHTML}\n\n1. ${choices[0]}\n2. ${choices[1]}\n3. ${choices[2]}\n4. ${choices[3]}`;
    
    categories[categoryIndex].problems[currentProblemIndex].answer = `${avgBurstTime}`;
}

// 6번 문제: SJF 평균 대기시간 (텍스트만, 테이블 없음!)
function generateProcessSchedule6(categoryIndex) {
    const processCount = 4;
    const bursts = [];
    
    for (let i = 0; i < processCount; i++) {
        bursts.push(9 + Math.floor(Math.random() * 16));
    }
    
    const sorted = [...bursts].sort((a, b) => a - b);
    
    let currentTime = 0;
    let totalWaitTime = 0;
    
    sorted.forEach(burst => {
        totalWaitTime += currentTime;
        currentTime += burst;
    });
    
    const avgWaitTime = totalWaitTime / processCount;
    
    const choices = [
        (avgWaitTime - 7).toFixed(1),
        (avgWaitTime - 1).toFixed(1),
        avgWaitTime.toFixed(1),
        (avgWaitTime + 9.75).toFixed(2)
    ];
    
    categories[categoryIndex].problems[currentProblemIndex].question = 
        `대기하고 있는 프로세스 P1, P2, P3, P4의 처리시간은 ${bursts[0]}[ms], ${bursts[1]}[ms], ${bursts[2]}[ms], ${bursts[3]}[ms]일 때, 최단 작업 우선(SJF) 스케줄링으로 처리했을 때 평균 대기 시간은 얼마인가?\n\n1. ${choices[0]}[ms]\n2. ${choices[1]}[ms]\n3. ${choices[2]}[ms]\n4. ${choices[3]}[ms]`;
    
    categories[categoryIndex].problems[currentProblemIndex].answer = avgWaitTime.toFixed(1);
}

// 7번 문제: SJF 평균 반환시간과 평균 대기시간
function generateProcessSchedule7(categoryIndex) {
    const processCount = 4;
    const processes = [];
    
    for (let i = 0; i < processCount; i++) {
        processes.push({
            name: `P-${i + 1}`,
            arrival: 0,
            burst: 3 + Math.floor(Math.random() * 6)
        });
    }
    
    const sorted = [...processes].sort((a, b) => a.burst - b.burst);
    
    let currentTime = 0;
    let totalWaitTime = 0;
    let totalTurnaroundTime = 0;
    
    sorted.forEach(p => {
        totalWaitTime += currentTime;
        currentTime += p.burst;
        totalTurnaroundTime += currentTime;
    });
    
    const avgWaitTime = Math.round(totalWaitTime / processCount);
    const avgTurnaroundTime = Math.round(totalTurnaroundTime / processCount);
    
    let tableHTML = '<table>\n<tr><th>프로세스</th><th>실행시간</th></tr>\n';
    processes.forEach(p => {
        tableHTML += `<tr><td>${p.name}</td><td>${p.burst}</td></tr>\n`;
    });
    tableHTML += '</table>';
    
    categories[categoryIndex].problems[currentProblemIndex].question = 
        `SJF스케줄링에서 다음과 같은 작업들이 준비상태 큐에 있을 때 평균 반환시간과 평균 대기시간은?\n\n${tableHTML}\n\n1. 평균 반환시간 : ${avgTurnaroundTime}, 평균 대기시간 : ${avgWaitTime}\n2. 평균 반환시간 : ${avgTurnaroundTime}, 평균 대기시간 : ${avgWaitTime + 2}\n3. 평균 반환시간 : ${avgTurnaroundTime + 2}, 평균 대기시간 : ${avgWaitTime}\n4. 평균 반환시간 : ${avgTurnaroundTime + 2}, 평균 대기시간 : ${avgWaitTime + 2}`;
    
    categories[categoryIndex].problems[currentProblemIndex].answer = `평균 반환시간 : ${avgTurnaroundTime}, 평균 대기시간 : ${avgWaitTime}`;
}

// 8번 문제: SJF Task 종료시간
function generateProcessSchedule8(categoryIndex) {
    const tasks = [];
    
    for (let i = 0; i < 3; i++) {
        tasks.push({
            name: `Task${i + 1}`,
            arrival: i,
            burst: 3 + Math.floor(Math.random() * 4)
        });
    }
    
    const remaining = [...tasks];
    let currentTime = 0;
    let task2EndTime = 0;
    
    while (remaining.length > 0) {
        const available = remaining.filter(t => t.arrival <= currentTime);
        
        if (available.length === 0) {
            currentTime++;
            continue;
        }
        
        available.sort((a, b) => a.burst - b.burst);
        const selected = available[0];
        
        currentTime += selected.burst;
        
        if (selected.name === 'Task2') {
            task2EndTime = currentTime;
        }
        
        const index = remaining.indexOf(selected);
        remaining.splice(index, 1);
    }
    
    const choices = [
        Math.max(0, task2EndTime - 6),
        Math.max(0, task2EndTime - 3),
        task2EndTime,
        task2EndTime + 4
    ];
    
    let tableHTML = '<table>\n<tr><th>Task</th><th>도착시간</th><th>실행시간</th></tr>\n';
    tasks.forEach(t => {
        tableHTML += `<tr><td>${t.name}</td><td>${t.arrival}</td><td>${t.burst}</td></tr>\n`;
    });
    tableHTML += '</table>';
    
    categories[categoryIndex].problems[currentProblemIndex].question = 
        `다음과 같은 Task List에서 SJF방식으로 Scheduling할 경우 Task 2의 종료 시간을 구하면?\n\n${tableHTML}\n\n1. ${choices[0]}\n2. ${choices[1]}\n3. ${choices[2]}\n4. ${choices[3]}`;
    
    categories[categoryIndex].problems[currentProblemIndex].answer = `${task2EndTime}`;
}

// 9, 10, 11번 문제: HRN
function generateProcessSchedule9(categoryIndex) {
    generateHRNProblem(categoryIndex);
}

function generateProcessSchedule10(categoryIndex) {
    generateHRNProblem(categoryIndex);
}

function generateProcessSchedule11(categoryIndex) {
    generateHRNProblem(categoryIndex);
}

function generateHRNProblem(categoryIndex) {
    const processCount = 4;
    const processes = [];
    const processNames = ['A', 'B', 'C', 'D'];
    
    for (let i = 0; i < processCount; i++) {
        const waitTime = 5 + Math.floor(Math.random() * 116);
        const serviceTime = 2 + Math.floor(Math.random() * 44);
        
        processes.push({
            name: processNames[i],
            waitTime: waitTime,
            serviceTime: serviceTime,
            priority: (waitTime + serviceTime) / serviceTime
        });
    }
    
    const sorted = [...processes].sort((a, b) => b.priority - a.priority);
    const highestPriority = sorted[0].name;
    
    let tableHTML = '<table>\n<tr><th>작업</th><th>대기시간</th><th>서비스';
    
    if (currentProblemIndex === 8) {
        tableHTML += '시간</th></tr>\n';
    } else {
        tableHTML += '(실행)시간</th></tr>\n';
    }
    
    processes.forEach(p => {
        tableHTML += `<tr><td>${p.name}</td><td>${p.waitTime}</td><td>${p.serviceTime}</td></tr>\n`;
    });
    tableHTML += '</table>';
    
    if (currentProblemIndex === 8) {
        categories[categoryIndex].problems[currentProblemIndex].question = 
            `HRN방식으로 스케줄링 할 경우, 입력된 작업이 다음과 같을 때 우선순위가 가장 높은 작업은?\n\n${tableHTML}\n\n1. A\n2. B\n3. C\n4. D`;
    } else if (currentProblemIndex === 9) {
        categories[categoryIndex].problems[currentProblemIndex].question = 
            `HRN스케줄링 방식에서 입력된 작업이 다음과 같을 때 우선순위가 가장 높은것은?\n\n${tableHTML}\n\n1. A\n2. B\n3. C\n4. D`;
    } else {
        // 11번: 우선순위 순서
        sorted.sort((a, b) => b.priority - a.priority);
        const correctOrder = sorted.map(p => p.name).join(' > ');
        
        // ✅ 오답 보기 3개 생성
        const wrongChoices = [];
        
        // 오답 1: 랜덤 섞기
        const shuffle1 = [...processNames].sort(() => Math.random() - 0.5).join(' > ');
        if (shuffle1 !== correctOrder) wrongChoices.push(shuffle1);
        
        // 오답 2: 역순
        const reverse = [...sorted].reverse().map(p => p.name).join(' > ');
        if (reverse !== correctOrder && !wrongChoices.includes(reverse)) {
            wrongChoices.push(reverse);
        }
        
        // 오답 3: 랜덤 섞기 2
        while (wrongChoices.length < 3) {
            const shuffle = [...processNames].sort(() => Math.random() - 0.5).join(' > ');
            if (shuffle !== correctOrder && !wrongChoices.includes(shuffle)) {
                wrongChoices.push(shuffle);
            }
        }
        
        // ✅ 정답 + 오답 3개를 합쳐서 섞기
        const allChoices = [correctOrder, ...wrongChoices];
        shuffleArray(allChoices);
        
        // ✅ 정답이 몇 번 보기인지 찾기
        const correctIndex = allChoices.indexOf(correctOrder) + 1;
        
        categories[categoryIndex].problems[currentProblemIndex].question = 
            `HRN방식으로 스케줄링 할 경우, 입력된 작업이 다음과 같을 때 우선순위가 높은 순서부터 차례로 옳게 나열한 것은?\n\n${tableHTML}\n\n1. ${allChoices[0]}\n2. ${allChoices[1]}\n3. ${allChoices[2]}\n4. ${allChoices[3]}`;
        
        // ✅ 정답을 보기 번호로 저장
        categories[categoryIndex].problems[currentProblemIndex].answer = correctIndex.toString();
        return;
    }
    
    categories[categoryIndex].problems[currentProblemIndex].answer = highestPriority;
}

// ========================== 프로세스 스케줄링 알고리즘 끝 ==========================

// ========================== 디스크 스케줄링 알고리즘 시작 ==========================

// 1번 문제: FCFS 총 이동거리
function generateDiskSchedule1(categoryIndex) {
    const headStart = 30 + Math.floor(Math.random() * 70);
    const queueSize = 6 + Math.floor(Math.random() * 3);
    const queue = [];
    
    for (let i = 0; i < queueSize; i++) {
        queue.push(Math.floor(Math.random() * 200));
    }
    
    const result = simulateFCFSDisk(headStart, queue);
    
    categories[categoryIndex].problems[currentProblemIndex].question = 
        `디스크 입/출력 요청 대기 큐에 다음과 같은 순서로 기억되어 있다. 현재 헤드가 ${headStart}에 있을 때, 이들 모두를 처리하기 위한 총 이동거리는 얼마인가?\n\n대기큐: ${queue.join(', ')}`;
    
    categories[categoryIndex].problems[currentProblemIndex].answer = result.totalDistance.toString();
}

// 2번 문제: SSTF 가장 먼저 처리되는 트랙
function generateDiskSchedule2(categoryIndex) {
    const headStart = 40 + Math.floor(Math.random() * 30);
    const queueSize = 8 + Math.floor(Math.random() * 3);
    const queue = [];
    
    for (let i = 0; i < queueSize; i++) {
        queue.push(Math.floor(Math.random() * 200));
    }
    
    const result = simulateSSTFDisk(headStart, queue);
    const firstTrack = result.order[0];
    
    categories[categoryIndex].problems[currentProblemIndex].question = 
        `초기 헤드 위치가 ${headStart}이며 트랙 0방향으로 이동중이다. 디스크 대기 큐에 다음과 같은 순서의 액세스 요청이 대기 중일 때 SSTF 스케줄링을 사용하여 모든 처리를 완료하고자 한다. 가장 먼저 처리되는 트랙을 쓰시오.\n(단, 가장 안쪽 트랙 0, 가장 바깥쪽 트랙 200)\n\n대기큐: ${queue.join(', ')}`;
    
    categories[categoryIndex].problems[currentProblemIndex].answer = firstTrack.toString();
}

// 3번 문제: SSTF 총 헤드 이동거리
function generateDiskSchedule3(categoryIndex) {
    const headStart = 40 + Math.floor(Math.random() * 30);
    const maxTrack = 150;
    const queueSize = 6 + Math.floor(Math.random() * 2);
    const queue = [];
    
    for (let i = 0; i < queueSize; i++) {
        queue.push(Math.floor(Math.random() * maxTrack));
    }
    
    const result = simulateSSTFDisk(headStart, queue);
    
    categories[categoryIndex].problems[currentProblemIndex].question = 
        `디스크 큐에 다음과 같이 I/O 요청이 들어와 있다. 최소탐색시간 우선(SSTF)스케줄링 적용 시 발생하는 총 헤드 이동 거리를 구하시오.\n(단, 추가 I/O 요청은 없다고 가정한다. 디스크 헤드는 0부터 ${maxTrack}까지 이동 가능하며, 현재 위치는 ${headStart}이다.)\n\n대기큐: ${queue.join(', ')}`;
    
    categories[categoryIndex].problems[currentProblemIndex].answer = result.totalDistance.toString();
}

// 4번 문제: SSTF 처리 순서
function generateDiskSchedule4(categoryIndex) {
    const headStart = 40 + Math.floor(Math.random() * 30);
    const queueSize = 6 + Math.floor(Math.random() * 3);
    const queue = [];
    
    for (let i = 0; i < queueSize; i++) {
        queue.push(Math.floor(Math.random() * 200));
    }
    
    const result = simulateSSTFDisk(headStart, queue);
    const orderString = `${headStart}-${result.order.join('-')}`;
    
    categories[categoryIndex].problems[currentProblemIndex].question = 
        `사용자가 요청한 디스크 입,출력 내용이 다음과 같은 순서로 큐에 들어 있을 때 SSTF 스케줄링을 사용한 경우의 처리 순서를 쓰시오.\n(단, 현재 헤드 위치는 ${headStart}이고, 제일 안쪽이 1번, 바깥쪽이 200번 트랙이다.)\n\n대기큐: ${queue.join(', ')}`;
    
    categories[categoryIndex].problems[currentProblemIndex].answer = orderString;
}

// 5번 문제: SCAN 총 트랙 이동거리
function generateDiskSchedule5(categoryIndex) {
    const headStart = 20 + Math.floor(Math.random() * 30);
    const direction = 'down';
    const queueSize = 4 + Math.floor(Math.random() * 2);
    const queue = [];
    
    for (let i = 0; i < queueSize; i++) {
        queue.push(Math.floor(Math.random() * headStart * 2));
    }
    
    const result = simulateSCANDisk(headStart, queue, direction, 0, 200);
    
    categories[categoryIndex].problems[currentProblemIndex].question = 
        `디스크 스케줄링에서 SCAN기법을 사용할 경우, 다음과 같은 작업대기 큐의 작업들을 수행하기 위한 헤드의 총 트랙 이동 거리는?\n(단, 초기 헤드의 위치는 ${headStart}이고, 현재 0번 트랙으로 이동 중이다.)\n\n대기큐: ${queue.join(', ')}`;
    
    categories[categoryIndex].problems[currentProblemIndex].answer = result.totalDistance.toString();
}

// 6번 문제: SCAN 최후 처리 트랙
function generateDiskSchedule6(categoryIndex) {
    const headStart = 40 + Math.floor(Math.random() * 20);
    const direction = 'down';
    const queueSize = 4 + Math.floor(Math.random() * 2);
    const queue = [];
    
    for (let i = 0; i < queueSize; i++) {
        queue.push(Math.floor(Math.random() * 60));
    }
    
    const result = simulateSCANDisk(headStart, queue, direction, 0, 200);
    const lastTrack = result.order[result.order.length - 1];
    
    categories[categoryIndex].problems[currentProblemIndex].question = 
        `디스크 스케줄링 기법 중 SCAN을 사용하여 다음 작업대기 큐의 작업을 모두 처리하고자 할 경우, 가장 최후에 처리되는 트랙은?\n(단, 현재 디스크 헤드는 ${headStart + 10} 트랙에서 ${headStart}트랙으로 이동해 왔다고 가정한다.)\n\n대기큐: ${queue.join(', ')}`;
    
    categories[categoryIndex].problems[currentProblemIndex].answer = lastTrack.toString();
}

// 7번 문제: SCAN 가장 먼저 처리되는 트랙
function generateDiskSchedule7(categoryIndex) {
    const headStart = 50 + Math.floor(Math.random() * 30);
    const direction = 'down';
    const queueSize = 4;
    const queue = [];
    
    for (let i = 0; i < queueSize; i++) {
        queue.push(Math.floor(Math.random() * 100));
    }
    
    const result = simulateSCANDisk(headStart, queue, direction, 0, 200);
    const firstTrack = result.order[0];
    
    categories[categoryIndex].problems[currentProblemIndex].question = 
        `디스크에서 헤드가 ${headStart + 10}트랙을 처리하고 ${headStart}트랙으로 이동해 왔다. 디스크 스케줄링 기법으로 SCAN 방식을 사용할 때 다음 디스크 대기큐에서 가장 먼저 처리되는 트랙은?\n\n대기큐: ${queue.join(', ')}`;
    
    categories[categoryIndex].problems[currentProblemIndex].answer = firstTrack.toString();
}

// 8번 문제: C-SCAN 처리 순서
function generateDiskSchedule8(categoryIndex) {
    const headStart = 30 + Math.floor(Math.random() * 30);
    const direction = 'up';
    const maxTrack = 199;
    const queueSize = 5 + Math.floor(Math.random() * 2);
    const queue = [];
    
    for (let i = 0; i < queueSize; i++) {
        queue.push(Math.floor(Math.random() * 200));
    }
    
    const result = simulateCSCANDisk(headStart, queue, direction, 0, maxTrack);
    const orderString = result.order.map(t => t.toString()).join(' > ');
    
    categories[categoryIndex].problems[currentProblemIndex].question = 
        `트랙 번호가 0부터 ${maxTrack}인 ${maxTrack + 1}개의 트랙을 가진 디스크가 있다. 디스크 스케줄링 기법 중 C-SCAN을 사용하여 다음과 같은 작업 대기 큐(디스크 큐)의 작업을 처리하고자 하는 경우 처리되는 트랙의 순서를 바르게 나열하시오.\n(단, 현재 디스크 헤드는 트랙 ${headStart - 12}에서 트랙 ${headStart}로 이동해 왔다고 가정한다.)\n\n대기큐: ${queue.join(', ')}`;
    
    categories[categoryIndex].problems[currentProblemIndex].answer = `${headStart} > ${orderString}`;
}

// 9번 문제: C-SCAN 총 이동거리
function generateDiskSchedule9(categoryIndex) {
    const headStart = 40 + Math.floor(Math.random() * 20);
    const direction = 'down';
    const queueSize = 8 + Math.floor(Math.random() * 3);
    const queue = [];
    
    for (let i = 0; i < queueSize; i++) {
        queue.push(Math.floor(Math.random() * 200));
    }
    
    const result = simulateCSCANDisk(headStart, queue, direction, 0, 200);
    
    categories[categoryIndex].problems[currentProblemIndex].question = 
        `현재 헤드의 위치가 ${headStart}에 있고, 요청 대기열의 순서가 다음과 같을 경우 C-SCAN 스케줄링 알고리즘에 의한 헤드의 총 이동거리는 얼마인가?\n(단, 현재 헤드의 이동 방향은 안쪽이며, 안쪽의 위치는 0으로 가정한다.)\n\n대기큐: ${queue.join(', ')}`;
    
    categories[categoryIndex].problems[currentProblemIndex].answer = result.totalDistance.toString();
}

// 10번 문제: LOOK 가장 먼저 처리되는 트랙
function generateDiskSchedule10(categoryIndex) {
    const headStart = 40 + Math.floor(Math.random() * 30);
    const direction = 'up';
    const queueSize = 4;
    const queue = [];
    
    for (let i = 0; i < queueSize; i++) {
        queue.push(headStart + 10 + Math.floor(Math.random() * 50));
    }
    
    const result = simulateLOOKDisk(headStart, queue, direction);
    const firstTrack = result.order[0];
    
    categories[categoryIndex].problems[currentProblemIndex].question = 
        `디스크 스케줄링 방법 중 LOOK 방식을 사용할 때 현재 헤드가 ${headStart + 10}에서 ${headStart}으로 이동해 왔다고 가정할 경우 다음과 같은 디스크 큐에서 가장 먼저 처리되는 것은?\n\n대기큐: ${queue.join(', ')}`;
    
    categories[categoryIndex].problems[currentProblemIndex].answer = firstTrack.toString();
}

// 11번 문제: LOOK 총 헤드 이동
function generateDiskSchedule11(categoryIndex) {
    const headStart = 40 + Math.floor(Math.random() * 20);
    const direction = 'down';
    const queueSize = 4;
    const queue = [];
    
    for (let i = 0; i < queueSize; i++) {
        queue.push(Math.floor(Math.random() * 60));
    }
    
    const result = simulateLOOKDisk(headStart, queue, direction);
    
    categories[categoryIndex].problems[currentProblemIndex].question = 
        `다음과 같은 트랙이 요청되어 큐에 도착하였다. 모든 트랙을 서비스하기 위하여 LOOK 스케줄링 기법이 사용되었을 때 모두 몇 트랙의 헤드 이동이 생기는가?\n(단, 현재 헤드의 위치는 ${headStart} 트랙이고 헤드는 트랙 0 방향으로 움직이고 있다.)\n\n대기큐: ${queue.join(', ')}`;
    
    categories[categoryIndex].problems[currentProblemIndex].answer = result.totalDistance.toString();
}

// 12번 문제: C-LOOK 총 이동거리
function generateDiskSchedule12(categoryIndex) {
    const headStart = 40 + Math.floor(Math.random() * 20);
    const direction = 'up';
    const queueSize = 7 + Math.floor(Math.random() * 3);
    const queue = [];
    
    for (let i = 0; i < queueSize; i++) {
        queue.push(Math.floor(Math.random() * 200));
    }
    
    const result = simulateCLOOKDisk(headStart, queue, direction);
    
    categories[categoryIndex].problems[currentProblemIndex].question = 
    `디스크의 서비스 요청 대기 큐에 도착한 요청이 다음과 같을 때 C-LOOK 스케줄링 알고리즘에 의한 헤드의 총 이동거리는 얼마인가?\n(단, 현재 헤드의 위치는 ${headStart}에 있고, 헤드의 이동방향은 0에서 199방향이다.)\n\n대기큐: ${queue.join(', ')}`;
    
    categories[categoryIndex].problems[currentProblemIndex].answer = result.totalDistance.toString();
}


// ========================== 진법 변환 알고리즘 시작 ==========================
function generateRandomBaseConversionProblem(categoryIndex) {
    const conversionTypes = [
        { from: 10, to: 2, name: '10진수 → 2진수' },
        { from: 10, to: 8, name: '10진수 → 8진수' },
        { from: 10, to: 16, name: '10진수 → 16진수' },
        { from: 2, to: 10, name: '2진수 → 10진수' },
        { from: 8, to: 10, name: '8진수 → 10진수' },
        { from: 16, to: 10, name: '16진수 → 10진수' },
        { from: 2, to: 16, name: '2진수 → 16진수' }
    ];
    
    const type = conversionTypes[Math.floor(Math.random() * conversionTypes.length)];
    
    let decimalValue, sourceValue, targetValue;
    
    if (type.from === 10) {
        decimalValue = 1 + Math.floor(Math.random() * 255);
        sourceValue = decimalValue.toString(10);
        targetValue = decimalValue.toString(type.to).toUpperCase();
    } else if (type.to === 10) {
        decimalValue = 1 + Math.floor(Math.random() * 255);
        sourceValue = decimalValue.toString(type.from).toUpperCase();
        targetValue = decimalValue.toString(10);
    } else {
        decimalValue = 1 + Math.floor(Math.random() * 255);
        sourceValue = decimalValue.toString(type.from).toUpperCase();
        targetValue = decimalValue.toString(type.to).toUpperCase();
    }
    
    const baseNames = {
        2: '2진수',
        8: '8진수',
        10: '10진수',
        16: '16진수'
    };
    
    categories[categoryIndex].problems[currentProblemIndex].question = 
        `다음 ${baseNames[type.from]}를 ${baseNames[type.to]}로 변환하시오.\n\n${sourceValue}(${type.from}) = ( )(${type.to})`;
    
    categories[categoryIndex].problems[currentProblemIndex].answer = targetValue;
}
// ========================== 진법 변환 알고리즘 끝 ==========================

// ========================== Python 알고리즘 시작 ==========================

// 1번 문제: 함수 기본값 매개변수
function generatePythonProblem1(categoryIndex) {
    const num1 = 10 + Math.floor(Math.random() * 30);
    const num2 = 1 + Math.floor(Math.random() * 5);
    
    const code = `def exam(num1, num2=${num2}):\n    print('a=', num1, 'b=', num2)\n\nexam(${num1})`;
    const answer = `a= ${num1} b= ${num2}`;
    
    categories[categoryIndex].problems[0].question = `다음 Python 코드의 출력값을 작성하시오.\n\n${code}`;
    categories[categoryIndex].problems[0].answer = answer;
}

// 2번 문제: 비트 시프트 연산
function generatePythonProblem2(categoryIndex) {
    const a = 50 + Math.floor(Math.random() * 100);
    const rangeEnd = 2 + Math.floor(Math.random() * 2);
    let result = 0;
    for(let i = 1; i < rangeEnd; i++) {
        result = a >> i;
        result = result + 1;
    }
    
    const code = `a = ${a}\nresult = 0\nfor i in range(1, ${rangeEnd}):\n    result = a >> i\n    result = result + 1\nprint(result)`;
    const answer = result.toString();
    
    categories[categoryIndex].problems[1].question = `다음 Python 코드의 출력값을 작성하시오.\n\n${code}`;
    categories[categoryIndex].problems[1].answer = answer;
}

// 3번 문제: 클래스 + 리스트 인덱싱
function generatePythonProblem3(categoryIndex) {
    const cityGroups = [
        ['seoul', 'busan', 'daegu', 'incheon', 'gwangju', 'daejeon'],
        ['tokyo', 'osaka', 'kyoto', 'nagoya', 'sapporo', 'fukuoka'],
        ['paris', 'london', 'berlin', 'madrid', 'rome', 'vienna'],
        ['beijing', 'shanghai', 'guangzhou', 'shenzhen', 'chengdu', 'hangzhou']
    ];
    const selectedCities = cityGroups[Math.floor(Math.random() * cityGroups.length)];
    
    let str01 = '';
    for(let city of selectedCities) {
        str01 += city[0];
    }
    
    const cityList = selectedCities.map(c => `"${c}"`).join(', ');
    const code = `class good:\n    li = [${cityList}]\n\ng = good()\nstr01 = ''\nfor i in g.li:\n    str01 = str01 + i[0]\n\nprint(str01)`;
    
    categories[categoryIndex].problems[2].question = `다음 Python 코드의 출력값을 작성하시오.\n\n${code}`;
    categories[categoryIndex].problems[2].answer = str01;
}

// 4번 문제: 딕셔너리 컴프리헨션 + Set 연산
function generatePythonProblem4(categoryIndex) {
    const lst = [1, 2, 3];
    const multiplier = 2;
    const changeKey = 2;
    const changeVal = 5 + Math.floor(Math.random() * 5);
    const addVal = 90 + Math.floor(Math.random() * 10);
    
    const dst = {};
    for(let i of lst) {
        dst[i] = i * multiplier;
    }
    const s = new Set(Object.values(dst));
    dst[changeKey] = changeVal;
    s.add(addVal);
    
    const dstValues = new Set(Object.values(dst));
    const intersection = new Set([...s].filter(x => dstValues.has(x)));
    
    const code = `lst = [1, 2, 3]\ndst = {i : i * 2 for i in lst}\ns = set(dst.values())\nlst[0] = 99\ndst[2] = ${changeVal}\ns.add(${addVal})\nprint(len(s & set(dst.values())))`;
    
    categories[categoryIndex].problems[3].question = `다음 Python 코드의 출력값을 작성하시오.\n\n${code}`;
    categories[categoryIndex].problems[3].answer = intersection.size.toString();
}

// 5번 문제: 빈칸 채우기 (split)
function generatePythonProblem5(categoryIndex) {
    const methods = ['split', 'strip', 'replace'];
    const correctAnswer = 'split';
    
    const num1 = 1 + Math.floor(Math.random() * 5);
    const num2 = 1 + Math.floor(Math.random() * 5);
    
    const code = `print("파이썬 입출력에 대한 문제입니다.")\n\nnum1, num2 = input()._______()\nnum1 = int(num1)\nnum2 = int(num2)\nprint(num1, num2)\n\nnum3 = num1 + num2\nprint(str(num1) + " + " + str(num2) + " = " + str(num3))\n\n# 입력값: ${num1} ${num2}\n# 출력: 파이썬 입출력에 대한 문제입니다.\n# ${num1} ${num2}\n# ${num1} + ${num2} = ${num1 + num2}`;
    
    categories[categoryIndex].problems[4].question = `다음 Python 코드에서 빈칸에 들어갈 알맞은 답을 작성하시오.\n\n${code}`;
    categories[categoryIndex].problems[4].answer = correctAnswer;
}

// 6번 문제: 리스트 + 문자열 인덱싱
function generatePythonProblem6(categoryIndex) {
    const cityLists = [
        ['Seoul', 'Kyeonggi', 'Incheon', 'Daejun', 'Daegu', 'Pusan'],
        ['Tokyo', 'Osaka', 'Kyoto', 'Nagoya', 'Sapporo', 'Fukuoka'],
        ['Paris', 'London', 'Berlin', 'Madrid', 'Rome', 'Vienna']
    ];
    const selectedList = cityLists[Math.floor(Math.random() * cityLists.length)];
    const indexPos = 1;
    
    let str = selectedList[0][0];
    for(let city of selectedList) {
        str += city[indexPos];
    }
    
    const cityArray = selectedList.map(c => `"${c}"`).join(', ');
    const code = `a = [${cityArray}]\nstr = "${selectedList[0][0]}"\n\nfor i in a:\n    str = str + i[${indexPos}]\n\nprint(str)`;
    
    categories[categoryIndex].problems[5].question = `다음 Python 코드의 출력값을 작성하시오.\n\n${code}`;
    categories[categoryIndex].problems[5].answer = str;
}

// 7번 문제: 딕셔너리 + Set (4번과 유사)
function generatePythonProblem7(categoryIndex) {
    const lst = [1, 2, 3];
    const multiplier = 2;
    const changeKey = 2;
    const changeVal = 6 + Math.floor(Math.random() * 4);
    const addVal = 95 + Math.floor(Math.random() * 10);
    
    const dst = {};
    for(let i of lst) {
        dst[i] = i * multiplier;
    }
    const s = new Set(Object.values(dst));
    dst[changeKey] = changeVal;
    s.add(addVal);
    
    const dstValues = new Set(Object.values(dst));
    const intersection = new Set([...s].filter(x => dstValues.has(x)));
    
    const code = `lst = [1,2,3]\ndst = {i : i* 2 for i in lst}\ns = set(dst.values())\nlst[0] = 99 \ndst[2]=${changeVal}\ns.add(${addVal})\nprint(len(s & set(dst.values())))`;
    
    categories[categoryIndex].problems[6].question = `다음 Python 코드의 출력값을 작성하시오.\n\n${code}`;
    categories[categoryIndex].problems[6].answer = intersection.size.toString();
}

// 8번 문제: 트리 구조 (복잡한 문제 - 고정값 유지)
function generatePythonProblem8(categoryIndex) {
    const baseValues = [3, 5, 8, 12, 15, 18, 21];
    const offset = Math.floor(Math.random() * 5);
    const li = baseValues.map(v => v + offset);
    
    function calcTree(li) {
        const nodes = li.map((v, i) => ({value: v, children: []}));
        for(let i = 1; i < li.length; i++) {
            const parentIdx = Math.floor((i - 1) / 2);
            nodes[parentIdx].children.push(nodes[i]);
        }
        
        function calc(node, level = 0) {
            if(!node) return 0;
            const current = (level % 2 === 1) ? node.value : 0;
            const childSum = node.children.reduce((sum, child) => sum + calc(child, level + 1), 0);
            return current + childSum;
        }
        
        return calc(nodes[0]);
    }
    
    const result = calcTree(li);
    
    const code = `class Node:\n    def __init__(self, value):\n        self.value = value\n        self.children = []\n \ndef tree(li):\n    nodes = [Node(i) for i in li]\n    for i in range(1, len(li)):\n        nodes[(i - 1) // 2].children.append(nodes[i])\n    return nodes[0]\n \ndef calc(node, level=0):\n    if node is None:\n        return 0\n    return (node.value if level % 2 == 1 else 0) + sum(calc(n, level + 1) for n in node.children)\n \nli = [${li.join(', ')}]\n \nroot = tree(li)\n \nprint(calc(root))`;
    
    categories[categoryIndex].problems[7].question = `다음 Python 코드의 출력값을 작성하시오.\n\n${code}`;
    categories[categoryIndex].problems[7].answer = result.toString();
}

// 9번 문제: 리스트 역순 + 슬라이싱
function generatePythonProblem9(categoryIndex) {
    const length = 6;
    const start = 1 + Math.floor(Math.random() * 3);
    const lst = Array.from({length}, (_, i) => i + start);
    
    const reversed = [...lst].reverse();
    let sumEven = 0, sumOdd = 0;
    for(let i = 0; i < reversed.length; i++) {
        if(i % 2 === 0) sumEven += reversed[i];
        else sumOdd += reversed[i];
    }
    
    const code = `def func(lst):\n  for i in range(len(lst) //2):\n    lst[i], lst[-i-1] = lst[-i-1], lst[i]\n \nlst = [${lst.join(',')}] \nfunc(lst)\nprint(sum(lst[::2]) - sum(lst[1::2]))`;
    
    categories[categoryIndex].problems[8].question = `다음 Python 코드의 출력값을 작성하시오.\n\n${code}`;
    categories[categoryIndex].problems[8].answer = (sumEven - sumOdd).toString();
}

// 10번 문제: type() 체크
function generatePythonProblem10(categoryIndex) {
    const strVal = 50 + Math.floor(Math.random() * 150);
    const floatVal = strVal + 0.5;
    
    const typeResults = [
        (strVal.toString() + '.0').length,
        20,
        20
    ];
    
    const code = `def func(value):\n    if type(value) == type(100):\n        return 100\n    elif type(value) == type(""):\n        return len(value) \n    else:\n        return 20\n \n \na = '${strVal}.0'\nb = ${floatVal}\nc = (100, 200)\n \nprint(func(a) + func(b) + func(c))`;
    
    categories[categoryIndex].problems[9].question = `다음 Python 코드의 출력값을 작성하시오.\n\n${code}`;
    categories[categoryIndex].problems[9].answer = typeResults.reduce((a, b) => a + b, 0).toString();
}

// 11번 문제: 문자열 패턴 찾기
function generatePythonProblem11(categoryIndex) {
    const baseStrings = [
        'abdcabcabca',
        'xyzxyxyzxy',
        'abababcabc'
    ];
    const baseStr = baseStrings[Math.floor(Math.random() * baseStrings.length)];
    
    const patterns = [
        {p1: 'ab', p2: 'ca'},
        {p1: 'xy', p2: 'yz'},
        {p1: 'abc', p2: 'ab'}
    ];
    const patternIdx = baseStr === 'abdcabcabca' ? 0 : (baseStr === 'xyzxyxyzxy' ? 1 : 2);
    const selected = patterns[patternIdx];
    
    let count1 = 0, count2 = 0;
    for(let i = 0; i < baseStr.length; i++) {
        if(baseStr.substring(i, i + selected.p1.length) === selected.p1) count1++;
        if(baseStr.substring(i, i + selected.p2.length) === selected.p2) count2++;
    }
    
    const code = `def fnCalculation(x,y):\n    result = 0;\n    for i in range(len(x)):\n     temp = x[i:i+len(y)] \n     if temp == y:\n       result += 1;\n    return result\n \na = "${baseStr}"\np1 = "${selected.p1}";\np2 = "${selected.p2}";\n \nout = f"ab{fnCalculation(a,p1)}ca{fnCalculation(a,p2)}"\nprint(out)`;
    
    categories[categoryIndex].problems[10].question = `다음 Python 코드의 출력값을 작성하시오.\n\n${code}`;
    categories[categoryIndex].problems[10].answer = `ab${count1}ca${count2}`;
}

// 12번 문제: 빈칸 채우기 - 입력 처리 메소드
function generatePythonProblem12(categoryIndex) {
    const problems = [
        {
            message: "파이썬 입출력에 대한 문제입니다.",
            method: "split",
            operator: "+",
            num1: 1 + Math.floor(Math.random() * 5),
            num2: 1 + Math.floor(Math.random() * 5)
        },
        {
            message: "입력값을 처리하는 문제입니다.",
            method: "split",
            operator: "*",
            num1: 2 + Math.floor(Math.random() * 5),
            num2: 2 + Math.floor(Math.random() * 5)
        },
        {
            message: "Python 문자열 처리 문제입니다.",
            method: "split",
            operator: "-",
            num1: 10 + Math.floor(Math.random() * 10),
            num2: 1 + Math.floor(Math.random() * 5)
        }
    ];
    
    const selected = problems[Math.floor(Math.random() * problems.length)];
    const result = selected.operator === '+' ? selected.num1 + selected.num2 :
                   selected.operator === '-' ? selected.num1 - selected.num2 :
                   selected.num1 * selected.num2;
    
    const code = `print("${selected.message}")\n \nnum1, num2 = input()._____()\nnum1 = int(num1)\nnum2 = int(num2)\nprint(num1,num2)\n \nnum3 = num1 ${selected.operator} num2\nprint(str(num1) + " ${selected.operator} " + str(num2) + " = " + str(num3))\n\n# 입력값: ${selected.num1} ${selected.num2}\n# 출력: ${selected.message}\n# ${selected.num1} ${selected.num2}\n# ${selected.num1} ${selected.operator} ${selected.num2} = ${result}`;
    
    categories[categoryIndex].problems[11].question = `다음 Python 코드에서 빈칸에 들어갈 알맞은 답을 작성하시오.\n\n${code}`;
    categories[categoryIndex].problems[11].answer = selected.method;
}

// 13번 문제: 리스트 슬라이싱 합계
function generatePythonProblem13(categoryIndex) {
    const length = 5 + Math.floor(Math.random() * 3);
    const start = 1 + Math.floor(Math.random() * 3);
    const lst = Array.from({length}, (_, i) => i + start);
    
    let sum = 0;
    for(let i = 0; i < lst.length; i += 2) {
        sum += lst[i];
    }
    
    const code = `lst = [${lst.join(', ')}]\nprint(sum(lst[::2]))`;
    
    categories[categoryIndex].problems[12].question = `다음 Python 코드의 출력값을 작성하시오.\n\n${code}`;
    categories[categoryIndex].problems[12].answer = sum.toString();
}

// 14번 문제: 유형 선택형 (사용자가 드롭다운에서 선택)
function generateCategorizedPythonProblem(categoryIndex, selectedType) {
    let code = '';
    let answer = '';
    
    // ========== 함수 기본값 매개변수 ==========
    if (selectedType === 'functionDefault') {
        const num1 = 10 + Math.floor(Math.random() * 30);
        const num2 = 1 + Math.floor(Math.random() * 5);
        
        code = `def exam(num1, num2=${num2}):\n    print('a=', num1, 'b=', num2)\n\nexam(${num1})`;
        answer = `a= ${num1} b= ${num2}`;
    }
    
    // ========== 비트 시프트 연산 ==========
    else if (selectedType === 'bitShift') {
        const a = 50 + Math.floor(Math.random() * 100);
        const rangeEnd = 2 + Math.floor(Math.random() * 2);
        let result = 0;
        for(let i = 1; i < rangeEnd; i++) {
            result = a >> i;
            result = result + 1;
        }
        
        code = `a = ${a}\nresult = 0\nfor i in range(1, ${rangeEnd}):\n    result = a >> i\n    result = result + 1\nprint(result)`;
        answer = result.toString();
    }
    
    // ========== 클래스 + 리스트 인덱싱 ==========
    else if (selectedType === 'classList') {
        const cities = [
            ['seoul', 'busan', 'daegu', 'incheon', 'gwangju', 'daejeon'],
            ['tokyo', 'osaka', 'kyoto', 'nagoya', 'sapporo', 'fukuoka'],
            ['paris', 'london', 'berlin', 'madrid', 'rome', 'vienna']
        ];
        const selectedCities = cities[Math.floor(Math.random() * cities.length)];
        let str01 = '';
        for(let city of selectedCities) {
            str01 += city[0];
        }
        
        const cityList = selectedCities.map(c => `"${c}"`).join(', ');
        code = `class good:\n    li = [${cityList}]\n\ng = good()\nstr01 = ''\nfor i in g.li:\n    str01 = str01 + i[0]\n\nprint(str01)`;
        answer = str01;
    }
    
    // ========== 딕셔너리 컴프리헨션 + Set 연산 ==========
    else if (selectedType === 'dictSetOp') {
        const lst = [1, 2, 3];
        const multiplier = 2 + Math.floor(Math.random() * 2);
        const changeIdx = 2;
        const changeVal = 5 + Math.floor(Math.random() * 5);
        const addVal = 90 + Math.floor(Math.random() * 10);
        
        const dst = {};
        for(let i of lst) {
            dst[i] = i * multiplier;
        }
        const s = new Set(Object.values(dst));
        dst[changeIdx] = changeVal;
        s.add(addVal);
        
        const dstValues = new Set(Object.values(dst));
        const intersection = new Set([...s].filter(x => dstValues.has(x)));
        
        code = `lst = [1, 2, 3]\ndst = {i : i * ${multiplier} for i in lst}\ns = set(dst.values())\nlst[0] = 99\ndst[${changeIdx}] = ${changeVal}\ns.add(${addVal})\nprint(len(s & set(dst.values())))`;
        answer = intersection.size.toString();
    }
    
    // ========== 리스트 + 문자열 인덱싱 ==========
    else if (selectedType === 'listStringIndex') {
        const cityLists = [
            ['Seoul', 'Kyeonggi', 'Incheon', 'Daejun', 'Daegu', 'Pusan'],
            ['Tokyo', 'Osaka', 'Kyoto', 'Nagoya', 'Sapporo', 'Fukuoka'],
            ['Paris', 'London', 'Berlin', 'Madrid', 'Rome', 'Vienna']
        ];
        const selectedList = cityLists[Math.floor(Math.random() * cityLists.length)];
        const indexPos = 1 + Math.floor(Math.random() * 2);
        
        let str = selectedList[0][0];
        for(let city of selectedList) {
            str += city[indexPos];
        }
        
        const cityArray = selectedList.map(c => `"${c}"`).join(', ');
        code = `a = [${cityArray}]\nstr = "${selectedList[0][0]}"\n\nfor i in a:\n    str = str + i[${indexPos}]\n\nprint(str)`;
        answer = str;
    }
    
    // ========== 리스트 슬라이싱 합계 ==========
    else if (selectedType === 'listSliceSum') {
        const length = 5 + Math.floor(Math.random() * 3);
        const lst = Array.from({length}, (_, i) => i + 1);
        
        let sum = 0;
        for(let i = 0; i < lst.length; i += 2) {
            sum += lst[i];
        }
        
        code = `lst = [${lst.join(', ')}]\nprint(sum(lst[::2]))`;
        answer = sum.toString();
    }
    
    // ========== 리스트 역순 + 슬라이싱 연산 ==========
    else if (selectedType === 'listReverse') {
        const length = 6;
        const lst = Array.from({length}, (_, i) => i + 1);
        
        const reversed = [...lst].reverse();
        let sumEven = 0, sumOdd = 0;
        for(let i = 0; i < reversed.length; i++) {
            if(i % 2 === 0) sumEven += reversed[i];
            else sumOdd += reversed[i];
        }
        
        code = `def func(lst):\n  for i in range(len(lst) //2):\n    lst[i], lst[-i-1] = lst[-i-1], lst[i]\n \nlst = [${lst.join(',')}] \nfunc(lst)\nprint(sum(lst[::2]) - sum(lst[1::2]))`;
        answer = (sumEven - sumOdd).toString();
    }
    
    // ========== type() 체크 함수 ==========
    else if (selectedType === 'typeCheck') {
        const strVal = Math.floor(Math.random() * 200) + 50;
        const floatVal = strVal + 0.5;
        
        const typeResults = [
            (strVal.toString() + '.0').length,
            20,
            20
        ];
        
        code = `def func(value):\n    if type(value) == type(100):\n        return 100\n    elif type(value) == type(""):\n        return len(value) \n    else:\n        return 20\n \n \na = '${strVal}.0'\nb = ${floatVal}\nc = (100, 200)\n \nprint(func(a) + func(b) + func(c))`;
        answer = typeResults.reduce((a, b) => a + b, 0).toString();
    }
    
    // ========== 문자열 슬라이싱 패턴 찾기 ==========
    else if (selectedType === 'stringPattern') {
        const baseStr = 'abdcabcabca';
        const patterns = [
            {p1: 'ab', p2: 'ca'},
            {p1: 'bc', p2: 'ab'},
            {p1: 'ca', p2: 'bc'}
        ];
        const selected = patterns[Math.floor(Math.random() * patterns.length)];
        
        let count1 = 0, count2 = 0;
        for(let i = 0; i < baseStr.length; i++) {
            if(baseStr.substring(i, i + selected.p1.length) === selected.p1) count1++;
            if(baseStr.substring(i, i + selected.p2.length) === selected.p2) count2++;
        }
        
        code = `def fnCalculation(x,y):\n    result = 0;\n    for i in range(len(x)):\n     temp = x[i:i+len(y)] \n     if temp == y:\n       result += 1;\n    return result\n \na = "${baseStr}"\np1 = "${selected.p1}";\np2 = "${selected.p2}";\n \nout = f"ab{fnCalculation(a,p1)}ca{fnCalculation(a,p2)}"\nprint(out)`;
        answer = `ab${count1}ca${count2}`;
    }
    
    // ========== 기본 반복문 합계 ==========
    else {
        const start = 1;
        const end = 5 + Math.floor(Math.random() * 5);
        let total = 0;
        for(let i = start; i <= end; i++) {
            total += i;
        }
        
        code = `total = 0\nfor i in range(${start}, ${end + 1}):\n    total += i\nprint(total)`;
        answer = total.toString();
    }
    
    categories[categoryIndex].problems[currentProblemIndex].question = 
        `다음 Python 코드의 출력값을 작성하시오.\n\n${code}`;
    
    categories[categoryIndex].problems[currentProblemIndex].answer = answer;
}

// ========================== Python 알고리즘 끝 ==========================

// ====================== C언어 랜덤 문제 생성 ======================

// 1번 문제: switch문 - 2020년 1회
function generateCProblem1(categoryIndex) {
    const caseNum = 1 + Math.floor(Math.random() * 5);
    const initC = Math.floor(Math.random() * 3) + 1;
    
    const operations = [
        { op: '+=', val: Math.floor(Math.random() * 5) + 1 },
        { op: '++', val: 1 },
        { op: '=', val: Math.floor(Math.random() * 3) },
        { op: '+=', val: Math.floor(Math.random() * 5) + 1 },
        { op: '-=', val: Math.floor(Math.random() * 10) + 5 },
        { op: '--', val: -1 }
    ];
    
    let c = initC;
    for(let i = caseNum - 1; i < 6; i++) {
        if(operations[i].op === '++') {
            c++;
        } else if(operations[i].op === '--') {
            c--;
        } else if(operations[i].op === '=') {
            c = operations[i].val;
        } else if(operations[i].op === '+=') {
            c += operations[i].val;
        } else if(operations[i].op === '-=') {
            c -= operations[i].val;
        }
    }
    
    const caseCode = operations.map((op, idx) => {
        const caseLabel = idx < 5 ? `case ${idx + 1}` : 'default';
        let statement;
        if(op.op === '++') statement = 'c++;';
        else if(op.op === '--') statement = 'c--;';
        else if(op.op === '=') statement = `c = ${op.val};`;
        else statement = `c ${op.op} ${op.val};`;
        return `    ${caseLabel}: ${statement}`;
    }).join('\\n');
    
    const code = `#include <stdio.h>\\n\\nint main() {\\n  int c = ${initC};\\n  switch(${caseNum}) {\\n${caseCode}\\n  }\\n  printf(\\\"%d\\\", c);\\n  return 0;\\n}`;
    
    categories[categoryIndex].problems[0].question = `다음 C언어 코드의 출력값을 작성하시오.\\n\\n${code}`;
    categories[categoryIndex].problems[0].answer = c.toString();
}

// 2번 문제: 배열 정렬 (버블소트) - 2020년 1회
function generateCProblem2(categoryIndex) {
    const arrLength = 5 + Math.floor(Math.random() * 3);
    const arr = Array.from({length: arrLength}, () => Math.floor(Math.random() * 50) + 50);
    const sorted = [...arr].sort((a, b) => a - b);
    
    const code = `#include <stdio.h>\\n\\nvoid align(int a[]) {\\n  int temp;\\n  for(int i = 0; i < ${arrLength - 1}; i++) {\\n    for(int j = 0; j < ${arrLength - 1} - i; j++) {\\n      if(a[j] > a[j+1]) {\\n        temp = a[j];\\n        a[j] = a[j+1];\\n        a[j+1] = temp;\\n      }\\n    }\\n  }\\n}\\n\\nint main() {\\n  int a[] = {${arr.join(', ')}};\\n  align(a);\\n  for(int i = 0; i < ${arrLength}; i++)\\n    printf(\\\"%d \\\", a[i]);\\n  return 0;\\n}`;
    
    categories[categoryIndex].problems[1].question = `다음 C언어 코드의 출력값을 작성하시오.\\n\\n${code}`;
    categories[categoryIndex].problems[1].answer = sorted.join(' ');
}

// 3번 문제: while문 - 2020년 3회
function generateCProblem3(categoryIndex) {
    const maxIter = 5 + Math.floor(Math.random() * 5);
    const operations = [
        { var: 'c', op: '*=', param: 'i' },
        { var: 'c', op: '+=', param: 'i' },
        { var: 'c', op: '-=', param: 'i' },
        { var: 'i', op: '+=', param: '2' }
    ];
    const selectedOp = operations[Math.floor(Math.random() * operations.length)];
    
    let c = 0;
    let i = 0;
    while(i < maxIter) {
        i++;
        if(selectedOp.var === 'c') {
            if(selectedOp.op === '*=') c *= i;
            else if(selectedOp.op === '+=') c += i;
            else if(selectedOp.op === '-=') c -= i;
        }
    }
    
    const code = `#include <stdio.h>\\n\\nvoid main() {\\n  int c = 0;\\n  int i = 0;\\n  while(i < ${maxIter}) {\\n    i++;\\n    c ${selectedOp.op} ${selectedOp.param};\\n  }\\n  printf(\\\"%d\\\", c);\\n}`;
    
    categories[categoryIndex].problems[2].question = `다음 C언어 코드의 출력값을 작성하시오.\\n\\n${code}`;
    categories[categoryIndex].problems[2].answer = c.toString();
}

// 4번 문제: 문자열 포인터 - 2020년 4회
function generateCProblem4(categoryIndex) {
    const strings = ['KOREA', 'PYTHON', 'HELLO', 'WORLD', 'CODER'];
    const str = strings[Math.floor(Math.random() * strings.length)];
    const offset = 1 + Math.floor(Math.random() * 3);
    
    const result = str + str.substring(offset) + str[0] + str[offset] + String.fromCharCode(str.charCodeAt(0) + 2);
    
    const code = `#include <stdio.h>\\n\\nint main() {\\n  char *p = \\\"${str}\\\";\\n  printf(\\\"%s\\\", p);\\n  printf(\\\"%s\\\", p + ${offset});\\n  printf(\\\"%c\\\", *p);\\n  printf(\\\"%c\\\", *(p + ${offset}));\\n  printf(\\\"%c\\\", *p + 2);\\n  return 0;\\n}`;
    
    categories[categoryIndex].problems[3].question = `다음 C언어 코드의 출력값을 작성하시오.\\n\\n${code}`;
    categories[categoryIndex].problems[3].answer = result;
}

// 5번 문제: 구조체 - 2021년 2회
function generateCProblem5(categoryIndex) {
    const age = 18 + Math.floor(Math.random() * 10);
    const score = 80 + Math.floor(Math.random() * 20);
    const result = age + score;
    
    const code = `#include <stdio.h>\\n\\nstruct Student {\\n  int age;\\n  int score;\\n};\\n\\nint main() {\\n  struct Student s;\\n  s.age = ${age};\\n  s.score = ${score};\\n  \\n  printf(\\\"%d\\\", s.age + s.score);\\n  return 0;\\n}`;
    
    categories[categoryIndex].problems[4].question = `다음 C언어 코드의 출력값을 작성하시오.\\n\\n${code}`;
    categories[categoryIndex].problems[4].answer = result.toString();
}

// 6번 문제: 포인터 배열 - 2021년 2회
function generateCProblem6(categoryIndex) {
    const val1 = Math.floor(Math.random() * 5) + 1;
    const operations = [
        { desc: '+ 1', calc: val1 + 1 },
        { desc: '* 2', calc: val1 * 2 },
        { desc: '+ 2', calc: val1 + 2 },
        { desc: '* 2 + 1', calc: val1 * 2 + 1 }
    ];
    
    const op1 = operations[Math.floor(Math.random() * operations.length)];
    const val2 = op1.calc;
    const op2 = operations[Math.floor(Math.random() * operations.length)];
    const val3 = val2 + Math.floor(Math.random() * 3) + 1;
    
    const sum = val1 + val2 + val3;
    
    const code = `#include <stdio.h>\\n\\nint main() {\\n  int ary[3];\\n  int s = 0;\\n  *(ary + 0) = ${val1};\\n  ary[1] = *(ary + 0) ${op1.desc.includes('*') ? '*' : '+'} ${op1.desc.includes('*') ? '2' : op1.desc.split('+')[1].trim()};\\n  ary[2] = ary[1] + ${val3 - val2};\\n  for(int i = 0; i < 3; i++) {\\n    s = s + ary[i];\\n  }\\n  printf(\\\"%d\\\", s);\\n  return 0;\\n}`;
    
    categories[categoryIndex].problems[5].question = `다음 C언어 코드의 출력값을 작성하시오.\\n\\n${code}`;
    categories[categoryIndex].problems[5].answer = sum.toString();
}

// 7번 문제: 배열 최댓값 찾기 - 2021년 3회
function generateCProblem7(categoryIndex) {
    const arrLength = 5 + Math.floor(Math.random() * 3);
    const arr = Array.from({length: arrLength}, () => Math.floor(Math.random() * 30) + 1);
    const findMin = Math.random() < 0.5;
    const result = findMin ? Math.min(...arr) : Math.max(...arr);
    const comparison = findMin ? '<' : '>';
    const varName = findMin ? 'min' : 'max';
    
    const code = `#include <stdio.h>\\n\\nint main() {\\n  int arr[] = {${arr.join(', ')}};\\n  int ${varName} = arr[0];\\n  int i;\\n  \\n  for(i = 1; i < ${arrLength}; i++) {\\n    if(arr[i] ${comparison} ${varName})\\n      ${varName} = arr[i];\\n  }\\n  \\n  printf(\\\"%d\\\", ${varName});\\n  return 0;\\n}`;
    
    categories[categoryIndex].problems[6].question = `다음 C언어 코드의 출력값을 작성하시오.\\n\\n${code}`;
    categories[categoryIndex].problems[6].answer = result.toString();
}

// 8번 문제: swap 함수 (포인터) - 2021년 3회
function generateCProblem8(categoryIndex) {
    const x = 10 + Math.floor(Math.random() * 20);
    const y = x + 10 + Math.floor(Math.random() * 10);
    
    const code = `#include <stdio.h>\\n\\nvoid swap(int *a, int *b) {\\n  int temp = *a;\\n  *a = *b;\\n  *b = temp;\\n}\\n\\nint main() {\\n  int x = ${x}, y = ${y};\\n  swap(&x, &y);\\n  printf(\\\"%d %d\\\", x, y);\\n  return 0;\\n}`;
    
    categories[categoryIndex].problems[7].question = `다음 C언어 코드의 출력값을 작성하시오.\\n\\n${code}`;
    categories[categoryIndex].problems[7].answer = `${y} ${x}`;
}

// 9번 문제: 포인터 배열 연산 - 2021년 3회
function generateCProblem9(categoryIndex) {
    const a = 10 + Math.floor(Math.random() * 10);
    const b = a + 10 + Math.floor(Math.random() * 10);
    const c = b + 10 + Math.floor(Math.random() * 10);
    
    const formulas = [
        { code: '*arr[1] + **arr + 1', calc: () => b + a + 1 },
        { code: '*arr[0] + *arr[2] - 1', calc: () => a + c - 1 },
        { code: '**arr * 2 + *arr[1]', calc: () => a * 2 + b },
        { code: '*arr[2] - *arr[1] + **arr', calc: () => c - b + a },
        { code: '(*arr[0] + *arr[1]) / 2', calc: () => Math.floor((a + b) / 2) }
    ];
    const selected = formulas[Math.floor(Math.random() * formulas.length)];
    const result = selected.calc();
    
    const code = `#include <stdio.h>\\n\\nint main() {\\n  int *arr[3];\\n  int a = ${a}, b = ${b}, c = ${c};\\n  arr[0] = &a;\\n  arr[1] = &b;\\n  arr[2] = &c;\\n  printf(\\\"%d\\\", ${selected.code});\\n  return 0;\\n}`;
    
    categories[categoryIndex].problems[8].question = `다음 C언어 코드의 출력값을 작성하시오.\\n\\n${code}`;
    categories[categoryIndex].problems[8].answer = result.toString();
}

// 10번 문제: 비트 AND 연산 - 2022년 1회
function generateCProblem10(categoryIndex) {
    const a = 8 + Math.floor(Math.random() * 10);
    const b = 5 + Math.floor(Math.random() * 10);
    const result = a & b;
    
    const code = `#include <stdio.h>\\n\\nint main() {\\n  int a = ${a};\\n  int b = ${b};\\n  \\n  printf(\\\"%d\\\", a & b);\\n  return 0;\\n}`;
    
    categories[categoryIndex].problems[9].question = `다음 C언어 코드의 출력값을 작성하시오.\\n\\n${code}`;
    categories[categoryIndex].problems[9].answer = result.toString();
}

// 11번 문제: 삼항 연산자 (빈칸) - 2022년 1회
function generateCProblem11(categoryIndex) {
    const a = 5 + Math.floor(Math.random() * 10);
    const b = a + 5 + Math.floor(Math.random() * 10);
    const c = a;
    const result = Math.floor(c / 2);
    
    const code = `#include <stdio.h>\\n\\nint main() {\\n  int a = ${a};\\n  int b = ${b};\\n  int c;\\n  \\n  c = (a ( ① ) b) ? a : b;\\n  printf(\\\"%d\\\", c / 2);\\n  \\n  return 0;\\n}`;
    
    categories[categoryIndex].problems[10].question = `다음 C언어 프로그램의 괄호 안에 들어갈 알맞은 연산자를 작성하시오.\\n\\n${code}`;
    categories[categoryIndex].problems[10].answer = '>';
}

// 12번 문제: 숫자 역순 (빈칸) - 2022년 1회
function generateCProblem12(categoryIndex) {
    const number = 1000 + Math.floor(Math.random() * 9000);
    const reversed = parseInt(number.toString().split('').reverse().join(''));
    
    const code = `#include <stdio.h>\\n\\nint main() {\\n  int number = ${number};\\n  int div = 10;\\n  int result = 0;\\n  while(number ( ① ) 0) {\\n    result = result * div;\\n    result = result + number ( ② ) div;\\n    number = number ( ③ ) div;\\n  }\\n  printf(\\\"%d\\\", result);\\n  return 0;\\n}`;
    
    categories[categoryIndex].problems[11].question = `다음 C언어 프로그램의 괄호 안에 들어갈 알맞은 연산자를 작성하시오.\\n\\n${code}`;
    categories[categoryIndex].problems[11].answer = '1. > 2. % 3. /';
}

// 13번 문제: 재귀 팩토리얼 (입력) - 2022년 1회
function generateCProblem13(categoryIndex) {
    const inputNum = 4 + Math.floor(Math.random() * 3);
    
    function factorial(n) {
        if(n <= 1) return 1;
        return n * factorial(n - 1);
    }
    
    const result = factorial(inputNum);
    
    const code = `#include <stdio.h>\\n\\nint func(int a) {\\n  if(a <= 1)\\n    return 1;\\n  return a * func(a - 1);\\n}\\n\\nint main() {\\n  int a;\\n  scanf(\\\"%d\\\", &a);\\n  printf(\\\"%d\\\", func(a));\\n  return 0;\\n}`;
    
    categories[categoryIndex].problems[12].question = `다음 C언어 코드에서 입력값이 ${inputNum}가 들어왔을 때 출력값을 작성하시오.\\n\\n${code}`;
    categories[categoryIndex].problems[12].answer = result.toString();
}

// 14번 문제: 재귀 팩토리얼 (동일) - 2022년 1회
function generateCProblem14(categoryIndex) {
    const inputNum = 4 + Math.floor(Math.random() * 3);
    
    function factorial(n) {
        if(n <= 1) return 1;
        return n * factorial(n - 1);
    }
    
    const result = factorial(inputNum);
    
    const code = `#include <stdio.h>\\n\\nint func(int a) {\\n  if(a <= 1)\\n    return 1;\\n  return a * func(a - 1);\\n}\\n\\nint main() {\\n  int a;\\n  scanf(\\\"%d\\\", &a);\\n  printf(\\\"%d\\\", func(a));\\n  return 0;\\n}`;
    
    categories[categoryIndex].problems[13].question = `다음 C언어 코드에서 입력값이 ${inputNum}일 때 출력값을 작성하시오.\\n\\n${code}`;
    categories[categoryIndex].problems[13].answer = result.toString();
}

// 15번 문제: 배열과 포인터 연산 - 2022년 2회
function generateCProblem15(categoryIndex) {
    const base = 2 + Math.floor(Math.random() * 3);
    const multipliers = [
        [1, 2, 3, 4],
        [0, 1, 3, 5],
        [1, 2, 4, 6],
        [0, 2, 3, 5]
    ];
    const selected = multipliers[Math.floor(Math.random() * multipliers.length)];
    const arr = selected.map(m => base * m);
    
    let sum = 0;
    for(let i = 1; i < 4; i++) {
        const diff = arr[i] - arr[i-1];
        sum = sum + diff + arr[i];
    }
    
    const code = `#include <stdio.h>\\n\\nint main() {\\n  int a[4] = {${arr.join(', ')}};\\n  int b[3] = {};\\n  int i = 1;\\n  int sum = 0;\\n  int *p1;\\n  for(i; i < 4; i++) {\\n    p1 = a + i;\\n    b[i-1] = *p1 - a[i-1];\\n    sum = sum + b[i-1] + a[i];\\n  }\\n  printf(\\\"%d\\\", sum);\\n  return 0;\\n}`;
    
    categories[categoryIndex].problems[14].question = `다음 C언어 코드의 출력값을 작성하시오.\\n\\n${code}`;
    categories[categoryIndex].problems[14].answer = sum.toString();
}

// 16번 문제: 문자열 인덱싱 - 2023년 1회
function generateCProblem16(categoryIndex) {
    const strings = ['Programming', 'Information', 'Javascript', 'Development', 'Algorithm'];
    const str = strings[Math.floor(Math.random() * strings.length)];
    const idx = 3 + Math.floor(Math.random() * (str.length - 5));
    const result = str[idx];
    
    const code = `#include <stdio.h>\\n\\nint main() {\\n  char str[] = \\\"${str}\\\";\\n  printf(\\\"%c\\\", str[${idx}]);\\n  return 0;\\n}`;
    
    categories[categoryIndex].problems[15].question = `다음 C언어 코드의 출력값을 작성하시오.\\n\\n${code}`;
    categories[categoryIndex].problems[15].answer = result;
}

// 17번 문제: 문자열 포인터 출력 - 2023년 1회 (다양한 길이)
function generateCProblem17(categoryIndex) {
    const strings = [
        'Art', 'Cat', 'Dog', 'Sun', 'Joy', 
        'Code', 'Test', 'Work', 'Game', 'Data',
        'Python', 'Hello', 'World', 'Program'
    ];
    const str = strings[Math.floor(Math.random() * strings.length)];
    const patterns = [
        { 
            printfs: ['%s', '%c', '%c', '%s'],
            args: ['a', '*p', '*a', 'p'],
            getResult: (s) => s + s[0] + s[0] + s
        },
        {
            printfs: ['%c', '%s', '%c', '%s'],
            args: ['*a', 'p+1', '*(p+1)', 'a'],
            getResult: (s) => s[0] + s.substring(1) + s[1] + s
        },
        {
            printfs: ['%s', '%c', '%s'],
            args: ['p', '*(a+2)', 'a+1'],
            getResult: (s) => s + (s.length > 2 ? s[2] : '') + (s.length > 1 ? s.substring(1) : '')
        }
    ];
    const selected = patterns[Math.floor(Math.random() * patterns.length)];
    
    let result = '';
    for(let i = 0; i < selected.printfs.length; i++) {
        const arg = selected.args[i];
        if(arg === 'a' || arg === 'p') result += str;
        else if(arg === '*p' || arg === '*a') result += str[0];
        else if(arg === 'p+1' || arg === 'a+1') result += str.substring(1);
        else if(arg === '*(p+1)' || arg === '*(a+1)') result += str.length > 1 ? str[1] : '';
        else if(arg === '*(a+2)') result += str.length > 2 ? str[2] : '';
    }
    
    for(let i = 0; i < str.length; i++) {
        result += str[i];
    }
    
    const printfCode = selected.printfs.map((fmt, idx) => 
        `  printf(\\\"${fmt}\\\", ${selected.args[idx]});`
    ).join('\\n');
    
    const code = `#include <stdio.h>\\n\\nint main() {\\n  char a[] = \\\"${str}\\\";\\n  char* p = a;\\n${printfCode}\\n  for(int i = 0; a[i] != '\\\\0'; i++)\\n    printf(\\\"%c\\\", a[i]);\\n  return 0;\\n}`;
    
    categories[categoryIndex].problems[16].question = `다음 C언어 코드의 출력값을 작성하시오.\\n\\n${code}`;
    categories[categoryIndex].problems[16].answer = result;
}

// 18번 문제: 문자열 비교 (중복 문자 출력) - 2023년 1회
function generateCProblem18(categoryIndex) {
    const pairs = [
        {a: 'qwer', b: 'qwtety'},
        {a: 'abcd', b: 'acef'},
        {a: 'hello', b: 'world'},
        {a: 'test', b: 'best'},
        {a: 'python', b: 'java'},
        {a: 'code', b: 'decode'},
        {a: 'data', b: 'database'}
    ];
    const selected = pairs[Math.floor(Math.random() * pairs.length)];
    
    const modes = [
        { 
            code: 'for(int i = 0; a[i] != \'\\\\0\'; i++) {\\n    for(int j = 0; b[j] != \'\\\\0\'; j++) {\\n      if(a[i] == b[j])\\n        printf(\\\"%c\\\", a[i]);\\n    }\\n  }',
            calc: () => {
                let result = '';
                for(let i = 0; i < selected.a.length; i++) {
                    for(let j = 0; j < selected.b.length; j++) {
                        if(selected.a[i] === selected.b[j]) result += selected.a[i];
                    }
                }
                return result;
            }
        },
        {
            code: 'for(int i = 0; b[i] != \'\\\\0\'; i++) {\\n    for(int j = 0; a[j] != \'\\\\0\'; j++) {\\n      if(b[i] == a[j])\\n        printf(\\\"%c\\\", b[i]);\\n    }\\n  }',
            calc: () => {
                let result = '';
                for(let i = 0; i < selected.b.length; i++) {
                    for(let j = 0; j < selected.a.length; j++) {
                        if(selected.b[i] === selected.a[j]) result += selected.b[i];
                    }
                }
                return result;
            }
        }
    ];
    const selectedMode = modes[Math.floor(Math.random() * modes.length)];
    const result = selectedMode.calc();
    
    const code = `#include <stdio.h>\\n\\nint main() {\\n  char* a = \\\"${selected.a}\\\";\\n  char* b = \\\"${selected.b}\\\";\\n  ${selectedMode.code}\\n  return 0;\\n}`;
    
    categories[categoryIndex].problems[17].question = `다음 C언어 코드의 출력값을 작성하시오.\\n\\n${code}`;
    categories[categoryIndex].problems[17].answer = result;
}

// 19번 문제: 반복문 continue - 2023년 1회
function generateCProblem19(categoryIndex) {
    const maxNum = 8 + Math.floor(Math.random() * 5);
    const conditions = [
        { code: 'i % 2 == 1', check: (i) => i % 2 === 1 },
        { code: 'i % 2 == 0', check: (i) => i % 2 === 0 },
        { code: 'i % 3 == 0', check: (i) => i % 3 === 0 },
        { code: 'i % 3 != 0', check: (i) => i % 3 !== 0 }
    ];
    const selected = conditions[Math.floor(Math.random() * conditions.length)];
    
    let sum = 0;
    for(let i = 1; i <= maxNum; i++) {
        if(selected.check(i)) continue;
        sum += i;
    }
    
    const code = `#include <stdio.h>\\n\\nint main() {\\n  int i, sum = 0;\\n  \\n  for(i = 1; i <= ${maxNum}; i++) {\\n    if(${selected.code})\\n      continue;\\n    sum += i;\\n  }\\n  \\n  printf(\\\"%d\\\", sum);\\n  return 0;\\n}`;
    
    categories[categoryIndex].problems[18].question = `다음 C언어 코드의 출력값을 작성하시오.\\n\\n${code}`;
    categories[categoryIndex].problems[18].answer = sum.toString();
}

// 20번 문제: 삼항 연산자 - 2023년 1회
function generateCProblem20(categoryIndex) {
    const a = 3 + Math.floor(Math.random() * 5);
    const b = 2 + Math.floor(Math.random() * 4);
    
    const operations = [
        { cond: 'a > b', trueOp: 'a * 2', falseOp: 'b * 2', calc: () => (a > b) ? a * 2 : b * 2 },
        { cond: 'a < b', trueOp: 'a + b', falseOp: 'a - b', calc: () => (a < b) ? a + b : a - b },
        { cond: 'a >= b', trueOp: 'a * 3', falseOp: 'b + a', calc: () => (a >= b) ? a * 3 : b + a },
        { cond: 'a == b', trueOp: 'a + 10', falseOp: 'b + 5', calc: () => (a === b) ? a + 10 : b + 5 }
    ];
    const selected = operations[Math.floor(Math.random() * operations.length)];
    const c = selected.calc();
    
    const code = `#include <stdio.h>\\n\\nint main() {\\n  int a = ${a};\\n  int b = ${b};\\n  int c;\\n  \\n  c = (${selected.cond}) ? ${selected.trueOp} : ${selected.falseOp};\\n  printf(\\\"%d\\\", c);\\n  return 0;\\n}`;
    
    categories[categoryIndex].problems[19].question = `다음 C언어 코드의 출력값을 작성하시오.\\n\\n${code}`;
    categories[categoryIndex].problems[19].answer = c.toString();
}

// 21번 문제: 포인터 문자열 - 2023년 3회
function generateCProblem21(categoryIndex) {
    const strings = [
        'KOREA', 'HELLO', 'WORLD', 'CODER', 'PYTHON', 
        'JAVA', 'CODE', 'TEST', 'DATA', 'INFO'
    ];
    const str = strings[Math.floor(Math.random() * strings.length)];
    
    const patterns = [
        {
            printfs: ['%s\\\\n', '%s\\\\n', '%c\\\\n', '%c\\\\n', '%c\\\\n'],
            args: ['p', 'p+1', '*p', '*(p+3)', '*p+4'],
            getResult: (s) => {
                const parts = [
                    s,
                    s.substring(1),
                    s[0],
                    s.length > 3 ? s[3] : '',
                    String.fromCharCode(s.charCodeAt(0) + 4)
                ];
                return parts.join(' ');
            }
        },
        {
            printfs: ['%c\\\\n', '%s\\\\n', '%c\\\\n', '%s\\\\n', '%c\\\\n'],
            args: ['*p', 'p+2', '*(p+1)', 'p', '*p+3'],
            getResult: (s) => {
                const parts = [
                    s[0],
                    s.substring(2),
                    s.length > 1 ? s[1] : '',
                    s,
                    String.fromCharCode(s.charCodeAt(0) + 3)
                ];
                return parts.join(' ');
            }
        },
        {
            printfs: ['%s\\\\n', '%c\\\\n', '%c\\\\n', '%s\\\\n'],
            args: ['p+1', '*p', '*(p+2)', 'p'],
            getResult: (s) => {
                const parts = [
                    s.substring(1),
                    s[0],
                    s.length > 2 ? s[2] : '',
                    s
                ];
                return parts.join(' ');
            }
        }
    ];
    
    const selected = patterns[Math.floor(Math.random() * patterns.length)];
    const result = selected.getResult(str);
    
    const printfCode = selected.printfs.map((fmt, idx) => 
        `    printf(\\\"${fmt}\\\", ${selected.args[idx]});`
    ).join('\\n');
    
    const code = `#include\\n \\nint main() {\\n    char* p = \\\"${str}\\\";\\n${printfCode}\\n}`;
    
    categories[categoryIndex].problems[20].question = `다음은 C언어의 포인터 문제이다. 알맞는 출력값을 작성하시오.\\n\\n${code}`;
    categories[categoryIndex].problems[20].answer = result;
}

// 22번 문제: strlen 함수 - 2024년 1회
function generateCProblem22(categoryIndex) {
    const strings = ['Hello', 'World', 'Code', 'Test', 'Work'];
    const str = strings[Math.floor(Math.random() * strings.length)];
    const result = str.length;
    
    const code = `#include <stdio.h>\\n#include <string.h>\\n\\nint main() {\\n  char str[] = \\\"${str}\\\";\\n  printf(\\\"%d\\\", strlen(str));\\n  return 0;\\n}`;
    
    categories[categoryIndex].problems[21].question = `다음 C언어 코드의 출력값을 작성하시오.\\n\\n${code}`;
    categories[categoryIndex].problems[21].answer = result.toString();
}

// 23번 문제: 2차원 배열 대각선 합 - 2024년 1회 (수정)
function generateCProblem23(categoryIndex) {
    const size = 3;
    const baseNum = 1 + Math.floor(Math.random() * 3);
    const arr = [];
    let num = baseNum;
    
    for(let i = 0; i < size; i++) {
        arr[i] = [];
        for(let j = 0; j < size; j++) {
            arr[i][j] = num++;
        }
    }
    
    const patterns = [
        {
            condition: 'i == j',
            desc: '주 대각선',
            calc: () => {
                let sum = 0;
                for(let i = 0; i < size; i++) sum += arr[i][i];
                return sum;
            }
        },
        {
            condition: 'i + j == 2',
            desc: '역 대각선',
            calc: () => {
                let sum = 0;
                for(let i = 0; i < size; i++) {
                    for(let j = 0; j < size; j++) {
                        if(i + j === 2) sum += arr[i][j];
                    }
                }
                return sum;
            }
        },
        {
            condition: 'i == 1',
            desc: '중간 행',
            calc: () => {
                let sum = 0;
                for(let j = 0; j < size; j++) sum += arr[1][j];
                return sum;
            }
        },
        {
            condition: 'j == 1',
            desc: '중간 열',
            calc: () => {
                let sum = 0;
                for(let i = 0; i < size; i++) sum += arr[i][1];
                return sum;
            }
        }
    ];
    
    const selected = patterns[Math.floor(Math.random() * patterns.length)];
    const sum = selected.calc();
    
    const arrStr = arr.map(row => `{${row.join(',')}}`).join(',');
    
    const code = `#include <stdio.h>\\n\\nint main() {\\n  int arr[3][3] = {${arrStr}};\\n  int sum = 0;\\n  int i, j;\\n  \\n  for(i = 0; i < 3; i++) {\\n    for(j = 0; j < 3; j++) {\\n      if(${selected.condition})\\n        sum += arr[i][j];\\n    }\\n  }\\n  \\n  printf(\\\"%d\\\", sum);\\n  return 0;\\n}`;
    
    categories[categoryIndex].problems[22].question = `다음 C언어 코드의 출력값을 작성하시오.\\n\\n${code}`;
    categories[categoryIndex].problems[22].answer = sum.toString();
}

// 24번 문제: 비트 시프트 연산 - 2024년 1회
function generateCProblem24(categoryIndex) {
    const patterns = [
        {
            v1: 0,
            v2: () => 30 + Math.floor(Math.random() * 10),
            v3: () => 25 + Math.floor(Math.random() * 10),
            condition: 'v1 > v2',
            shift: 2
        },
        {
            v1: 5,
            v2: () => 3 + Math.floor(Math.random() * 5),
            v3: () => 20 + Math.floor(Math.random() * 10),
            condition: 'v1 < v2',
            shift: 2
        },
        {
            v1: 10,
            v2: () => 15 + Math.floor(Math.random() * 10),
            v3: () => 20 + Math.floor(Math.random() * 10),
            condition: 'v1 > v2',
            shift: 3
        },
        {
            v1: 0,
            v2: () => 8 + Math.floor(Math.random() * 8),
            v3: () => 12 + Math.floor(Math.random() * 8),
            condition: 'v1 == v2',
            shift: 2
        }
    ];
    
    const selected = patterns[Math.floor(Math.random() * patterns.length)];
    const v1 = selected.v1;
    const v2 = selected.v2();
    const v3 = selected.v3();
    const shiftAmount = selected.shift;
    
    let result;
    const conditionResult = eval(`${v1} ${selected.condition.split(' ')[1]} ${v2}`);
    const ternaryResult = conditionResult ? v2 : v1;
    
    if(ternaryResult) {
        result = (v2 << shiftAmount) + v3;
    } else {
        result = v2 + (v3 << shiftAmount);
    }
    
    const code = `#include <stdio.h>\\n\\nint main() {\\n  int v1 = ${v1}, v2 = ${v2}, v3 = ${v3};\\n  if(${selected.condition} ? v2 : v1) {\\n    v2 = v2 << ${shiftAmount};\\n  } else {\\n    v3 = v3 << ${shiftAmount};\\n  }\\n  printf(\\\"%d\\\", v2 + v3);\\n  return 0;\\n}`;
    
    categories[categoryIndex].problems[23].question = `다음 C언어 코드의 출력값을 작성하시오.\\n\\n${code}`;
    categories[categoryIndex].problems[23].answer = result.toString();
}

// 25번 문제: 배열 포인터 접근 - 2024년 1회
function generateCProblem25(categoryIndex) {
    const base = 10;
    const arr = [base, base * 2, base * 3];
    const idx = Math.floor(Math.random() * 3);
    const result = arr[idx];
    
    const code = `#include <stdio.h>\\n\\nint main() {\\n  int a[] = {${arr.join(', ')}};\\n  int *p = a;\\n  \\n  printf(\\\"%d\\\", *(p + ${idx}));\\n  return 0;\\n}`;
    
    categories[categoryIndex].problems[24].question = `다음 C언어 코드의 출력값을 작성하시오.\\n\\n${code}`;
    categories[categoryIndex].problems[24].answer = result.toString();
}

// 26번 문제: 문자열 역순 출력 - 2024년 1회
function generateCProblem26(categoryIndex) {
    const strings = ['ABCDEFGH', 'COMPUTER', 'KEYBOARD', 'MONITOR', 'PROGRAM', 'PYTHON', 'DATABASE'];
    const str = strings[Math.floor(Math.random() * strings.length)];
    const reversed = str.split('').reverse().join('');
    
    const patterns = [
        {
            start: 1,
            step: 2,
            calc: (rev) => {
                let result = '';
                for(let i = 1; i < rev.length; i += 2) result += rev[i];
                return result;
            }
        },
        {
            start: 0,
            step: 2,
            calc: (rev) => {
                let result = '';
                for(let i = 0; i < rev.length; i += 2) result += rev[i];
                return result;
            }
        },
        {
            start: 2,
            step: 2,
            calc: (rev) => {
                let result = '';
                for(let i = 2; i < rev.length; i += 2) result += rev[i];
                return result;
            }
        },
        {
            start: 0,
            step: 3,
            calc: (rev) => {
                let result = '';
                for(let i = 0; i < rev.length; i += 3) result += rev[i];
                return result;
            }
        }
    ];
    
    const selected = patterns[Math.floor(Math.random() * patterns.length)];
    const result = selected.calc(reversed);
    
    const code = `#include <stdio.h>\\n#include <string.h>\\n \\nvoid reverse(char* str){\\n    int len = strlen(str);\\n    char temp;\\n    char*p1 = str;\\n    char*p2 = str + len - 1;\\n    while(p1<p2){\\n        temp = *p1;\\n        *p1 = *p2;\\n        *p2 = temp;\\n        p1++;\\n        p2--;\\n    }\\n}\\n \\nint main(int argc, char* argv[]){\\n    char str[100] = \\\"${str}\\\";\\n \\n    reverse(str);\\n \\n    int len = strlen(str);\\n \\n    for(int i=${selected.start}; i<len; i+=${selected.step}){\\n        printf(\\\"%c\\\",str[i]);\\n    }\\n \\n    printf(\\\"\\\\n\\\");\\n \\n    return 0;\\n \\n}`;
    
    categories[categoryIndex].problems[25].question = `다음은 C언어에 대한 문제이다. 알맞는 출력 값을 작성하시오.\\n\\n${code}`;
    categories[categoryIndex].problems[25].answer = result;
}

// 27번 문제: 연결 리스트 (구조체) - 2024년 2회 (랜덤화)
function generateCProblem27(categoryIndex) {
    const val1 = 10 + Math.floor(Math.random() * 10);
    const val2 = val1 + 5 + Math.floor(Math.random() * 10);
    const val3 = val2 + 5 + Math.floor(Math.random() * 10);
    
    const patterns = [
        { access: 'head->n2->n1', result: val2, desc: '두 번째 노드' },
        { access: 'head->n1', result: val1, desc: '첫 번째 노드' },
        { access: 'head->n2->n2->n1', result: val3, desc: '세 번째 노드' },
        { access: 'head->n2->n1 + head->n1', result: val2 + val1, desc: '첫+두번째' }
    ];
    
    const selected = patterns[Math.floor(Math.random() * patterns.length)];
    const result = selected.result;
    
    const code = `#include <stdio.h>\\n \\nstruct node {\\n    int n1;\\n    struct node *n2;\\n};\\n \\nint main() {\\n \\n    struct node a = {${val1}, NULL};\\n    struct node b = {${val2}, NULL};\\n    struct node c = {${val3}, NULL};\\n \\n    struct node *head = &a;\\n    a.n2 = &b;\\n    b.n2 = &c;\\n \\n    printf(\\\"%d\\\\n\\\", ${selected.access});\\n \\n    return 0;\\n}`;
    
    categories[categoryIndex].problems[26].question = `다음은 C언어의 구조체에 대한 문제이다. 아래 코드를 확인하여 알맞는 출력 값을 작성하시오.\\n\\n${code}`;
    categories[categoryIndex].problems[26].answer = result.toString();
}

// 28번 문제: swap 함수 + switch문 - 2024년 2회
function generateCProblem28(categoryIndex) {
    const a = 10 + Math.floor(Math.random() * 5);
    const b = 15 + Math.floor(Math.random() * 10);
    
    let bResult = b;
    bResult += 2;
    bResult += 3;
    
    const result = a - bResult;
    
    const code = `#include <stdio.h>\\n \\nvoid swap(int a, int b) {\\n    int t = a;\\n    a = b;\\n    b = t;\\n}\\n \\nint main() {\\n    \\n    int a = ${a};\\n    int b = ${b};\\n    swap(a, b);\\n    \\n    switch(a) {\\n        case 1:\\n            b += 1;\\n        case 11:\\n            b += 2;\\n        default:\\n            b += 3;\\n        break;\\n    }\\n    \\n    printf(\\\"%d\\\", a-b);\\n}`;
    
    categories[categoryIndex].problems[27].question = `다음은 C언어에 대한 문제이다. 아래 코드를 확인하여 알맞는 출력 값을 작성하시오.\\n\\n${code}`;
    categories[categoryIndex].problems[27].answer = result.toString();
}

// 29번 문제: 짝수 합 - 2024년 2회
function generateCProblem29(categoryIndex) {
    const maxNum = 8 + Math.floor(Math.random() * 5);
    
    let a = 0;
    for(let i = 1; i < maxNum; i++) {
        if(i % 2 == 0) {
            a += i;
        }
    }
    
    const code = `#include <stdio.h>\\n\\nint main() {\\n  int i;\\n  int a = 0;\\n  for(i = 1; i < ${maxNum}; i++) {\\n    if(i % 2 == 0)\\n      a += i;\\n  }\\n  printf(\\\"%d\\\", a);\\n  return 0;\\n}`;
    
    categories[categoryIndex].problems[28].question = `다음 C언어 코드의 출력값을 작성하시오.\\n\\n${code}`;
    categories[categoryIndex].problems[28].answer = a.toString();
}

// 30번 문제: 배열 합 - 2024년 2회 (랜덤화)
function generateCProblem30(categoryIndex) {
    const arrLength = 5 + Math.floor(Math.random() * 3);
    const start = 1 + Math.floor(Math.random() * 3);
    const arr = Array.from({length: arrLength}, (_, i) => start + i);
    
    const patterns = [
        { desc: '전체 합', calc: () => arr.reduce((a, b) => a + b, 0) },
        { desc: '짝수 인덱스 합', calc: () => arr.filter((_, i) => i % 2 === 0).reduce((a, b) => a + b, 0) },
        { desc: '홀수 인덱스 합', calc: () => arr.filter((_, i) => i % 2 === 1).reduce((a, b) => a + b, 0) }
    ];
    
    const selected = patterns[Math.floor(Math.random() * patterns.length)];
    const sum = selected.calc();
    
    let forCondition = '';
    if(selected.desc === '전체 합') {
        forCondition = `for(i = 0; i < ${arrLength}; i++)`;
    } else if(selected.desc === '짝수 인덱스 합') {
        forCondition = `for(i = 0; i < ${arrLength}; i += 2)`;
    } else {
        forCondition = `for(i = 1; i < ${arrLength}; i += 2)`;
    }
    
    const code = `#include <stdio.h>\\n\\nint main() {\\n  int arr[${arrLength}] = {${arr.join(', ')}};\\n  int sum = 0;\\n  int i;\\n  \\n  ${forCondition} {\\n    sum += arr[i];\\n  }\\n  \\n  printf(\\\"%d\\\", sum);\\n  return 0;\\n}`;
    
    categories[categoryIndex].problems[29].question = `다음 C언어 코드의 출력값을 작성하시오.\\n\\n${code}`;
    categories[categoryIndex].problems[29].answer = sum.toString();
}

// 31번 문제: 재귀 함수 - 2024년 2회 (랜덤화)
function generateCProblem31(categoryIndex) {
    const n = 4 + Math.floor(Math.random() * 3);
    
    const functions = [
        {
            name: 'factorial',
            code: 'int factorial(int n) {\\n  if(n <= 1) return 1;\\n  return n * factorial(n - 1);\\n}',
            calc: (num) => {
                if(num <= 1) return 1;
                let result = 1;
                for(let i = 2; i <= num; i++) result *= i;
                return result;
            }
        },
        {
            name: 'fibonacci',
            code: 'int fibonacci(int n) {\\n  if(n <= 1) return n;\\n  return fibonacci(n - 1) + fibonacci(n - 2);\\n}',
            calc: (num) => {
                if(num <= 1) return num;
                let a = 0, b = 1;
                for(let i = 2; i <= num; i++) {
                    let temp = a + b;
                    a = b;
                    b = temp;
                }
                return b;
            }
        },
        {
            name: 'sumDigits',
            code: 'int sumDigits(int n) {\\n  if(n < 10) return n;\\n  return n % 10 + sumDigits(n / 10);\\n}',
            calc: (num) => {
                if(num < 10) return num;
                let sum = 0;
                while(num > 0) {
                    sum += num % 10;
                    num = Math.floor(num / 10);
                }
                return sum;
            }
        }
    ];
    
    const selected = functions[Math.floor(Math.random() * functions.length)];
    const inputValue = selected.name === 'sumDigits' ? 10 + n * 10 : n;
    const result = selected.calc(inputValue);
    
    const code = `#include <stdio.h>\\n\\n${selected.code}\\n\\nint main() {\\n  printf(\\\"%d\\\", ${selected.name}(${inputValue}));\\n  return 0;\\n}`;
    
    categories[categoryIndex].problems[30].question = `다음 C언어 코드의 출력값을 작성하시오.\\n\\n${code}`;
    categories[categoryIndex].problems[30].answer = result.toString();
}

// 32번 문제: 포인터로 값 변경 - 2024년 2회
function generateCProblem32(categoryIndex) {
    const initVal = 10 + Math.floor(Math.random() * 10);
    const newVal = 15 + Math.floor(Math.random() * 15);
    
    const code = `#include <stdio.h>\\n\\nint main() {\\n  int a = ${initVal};\\n  int *p = &a;\\n  \\n  *p = ${newVal};\\n  printf(\\\"%d\\\", a);\\n  return 0;\\n}`;
    
    categories[categoryIndex].problems[31].question = `다음 C언어 코드의 출력값을 작성하시오.\\n\\n${code}`;
    categories[categoryIndex].problems[31].answer = newVal.toString();
}

// 33번 문제: 2차원 배열 포인터 - 2024년 2회 (랜덤화)
function generateCProblem33(categoryIndex) {
    const base = 1 + Math.floor(Math.random() * 3);
    const arr = [];
    let num = base;
    
    for(let i = 0; i < 3; i++) {
        arr[i] = [];
        for(let j = 0; j < 3; j++) {
            arr[i][j] = num++;
        }
    }
    
    const patterns = [
        {
            ptrs: '{arr[1], arr[2]}',
            expr: 'parr[1][1] + *(parr[1]+2) + **parr',
            calc: () => arr[2][1] + arr[2][2] + arr[1][0]
        },
        {
            ptrs: '{arr[0], arr[2]}',
            expr: 'parr[1][0] + *(parr[0]+1) + parr[0][2]',
            calc: () => arr[2][0] + arr[0][1] + arr[0][2]
        },
        {
            ptrs: '{arr[0], arr[1]}',
            expr: '**parr + parr[1][2] + *(parr[1]+1)',
            calc: () => arr[0][0] + arr[1][2] + arr[1][1]
        },
        {
            ptrs: '{arr[1], arr[2]}',
            expr: '*(*parr + 2) + parr[1][0] + *(parr[0]+1)',
            calc: () => arr[1][2] + arr[2][0] + arr[1][1]
        }
    ];
    
    const selected = patterns[Math.floor(Math.random() * patterns.length)];
    const result = selected.calc();
    
    const code = `#include <stdio.h>\\n \\nint main() {\\n    int arr[3][3] = {${arr[0].join(', ')}, ${arr[1].join(', ')}, ${arr[2].join(', ')}};\\n    int* parr[2] = ${selected.ptrs};\\n    printf(\\\"%d\\\", ${selected.expr});\\n    \\n    return 0;\\n}`;
    
    categories[categoryIndex].problems[32].question = `다음은 C언어에 대한 문제이다. 아래 코드를 확인하여 알맞는 출력값을 작성하시오.\\n\\n${code}`;
    categories[categoryIndex].problems[32].answer = result.toString();
}

// 34번 문제: 문자열 복사 함수 - 2024년 2회 (다양한 길이)
function generateCProblem34(categoryIndex) {
    const strings = ['first', 'hello', 'world', 'cloud', 'python', 'code', 'test', 'data', 'info'];
    const str1 = strings[Math.floor(Math.random() * strings.length)];
    
    const patterns = [
        {
            desc: '인덱스 합',
            calc: (s) => {
                let result = 0;
                for(let i = 0; i < s.length; i++) result += i;
                return result;
            },
            code: 'for (int i = 0; str2[i] != \'\\\\0\'; i++) {\\n        result += i;\\n    }'
        },
        {
            desc: '인덱스 * 2 합',
            calc: (s) => {
                let result = 0;
                for(let i = 0; i < s.length; i++) result += i * 2;
                return result;
            },
            code: 'for (int i = 0; str2[i] != \'\\\\0\'; i++) {\\n        result += i * 2;\\n    }'
        },
        {
            desc: '짝수 인덱스 합',
            calc: (s) => {
                let result = 0;
                for(let i = 0; i < s.length; i += 2) result += i;
                return result;
            },
            code: 'for (int i = 0; str2[i] != \'\\\\0\'; i += 2) {\\n        result += i;\\n    }'
        },
        {
            desc: '문자열 길이',
            calc: (s) => s.length,
            code: 'for (int i = 0; str2[i] != \'\\\\0\'; i++) {\\n        result++;\\n    }'
        }
    ];
    
    const selected = patterns[Math.floor(Math.random() * patterns.length)];
    const result = selected.calc(str1);
    
    const code = `#include <stdio.h>\\n#include <string.h>\\n \\nvoid sumFn(char* d, const char* s) {\\n \\n    while (*s) {\\n        *d = *s;\\n        d++;\\n        s++;\\n    }\\n    *d = '\\\\0'; \\n}\\n \\nint main() {\\n   const char* str1 = \\\"${str1}\\\";\\n    char str2[50] = \\\"teststring\\\";  \\n    int result=0;\\n    sumFn(str2, str1);\\n \\n    ${selected.code}\\n    printf(\\\"%d\\\", result);\\n    \\n    return 0;\\n}`;
    
    categories[categoryIndex].problems[33].question = `다음은 C언어에 대한 문제이다. 아래 코드를 확인하여 알맞는 출력값을 작성하시오.\\n\\n${code}`;
    categories[categoryIndex].problems[33].answer = result.toString();
}

// 35번 문제: 연결 리스트 값 교환 - 2024년 3회 (랜덤화)
function generateCProblem35(categoryIndex) {
    const val1 = 1 + Math.floor(Math.random() * 3);
    const val2 = val1 + 1;
    const val3 = val2 + 1;
    
    const patterns = [
        {
            connection: 'n1.next = &n3;\\n  n3.next = &n2;',
            desc: 'n1->n3->n2 순서',
            calc: () => {
                // func 실행 후: n1과 n3 교환, n3과 n2는 교환 안 됨 (3개 중 홀수번째만)
                return `${val3}${val1}${val2}`;
            }
        },
        {
            connection: 'n1.next = &n2;\\n  n2.next = &n3;',
            desc: 'n1->n2->n3 순서',
            calc: () => {
                // func 실행 후: n1과 n2 교환, n3 그대로
                return `${val2}${val1}${val3}`;
            }
        },
        {
            connection: 'n2.next = &n1;\\n  n1.next = &n3;',
            desc: 'n2->n1->n3 순서',
            calc: () => {
                // func 실행 후: n2와 n1 교환, n3 그대로
                return `${val1}${val2}${val3}`;
            }
        }
    ];
    
    const selected = patterns[Math.floor(Math.random() * patterns.length)];
    const result = selected.calc();
    const startNode = selected.connection.includes('n2.next') ? '&n2' : '&n1';
    
    const code = `#include <stdio.h>\\n \\nstruct Node {\\n int value;\\n struct Node* next;\\n};\\n \\nvoid func(struct Node* node){\\n  while(node != NULL && node->next != NULL){\\n     int t = node->value;\\n     node->value = node->next->value;\\n     node->next->value = t;\\n     node = node->next->next;\\n  }\\n}\\n \\nint main(){\\n  struct Node n1 = {${val1}, NULL};\\n  struct Node n2 = {${val2}, NULL};\\n  struct Node n3 = {${val3}, NULL};\\n  \\n  ${selected.connection}\\n \\n  func(${startNode});  \\n \\n  struct Node* current = ${startNode};\\n \\n  while(current != NULL){\\n    printf(\\\"%d\\\", current->value);\\n    current = current->next;\\n }\\n \\n return 0;\\n \\n}`;
    
    categories[categoryIndex].problems[34].question = `다음은 C언어에 대한 문제이다. 아래 코드를 확인하여 알맞는 출력값을 작성하시오.\\n\\n${code}`;
    categories[categoryIndex].problems[34].answer = result;
}

// 36번 문제: static 변수 - 2024년 3회
function generateCProblem36(categoryIndex) {
    const iterations = 3 + Math.floor(Math.random() * 3);
    const increments = [2, 3, 5];
    const increment = increments[Math.floor(Math.random() * increments.length)];
    
    let sum = 0;
    for(let i = 0; i < iterations; i++) {
        sum += (i + 1) * increment;
    }
    
    const code = `#include <stdio.h>\\n \\nint func(){\\n static int x =0; \\n  x+=${increment}; \\n  return x;\\n}\\n \\nint main(){\\n  int x = 1; \\n  int sum=0; \\n  for(int i=0;i<${iterations};i++) {\\n    x++; \\n    sum+=func();\\n  } \\n  printf(\\\"%d\\\", sum);\\n \\n  return 0;\\n}`;
    
    categories[categoryIndex].problems[35].question = `다음은 C언어에 대한 문제이다. 아래 코드를 확인하여 알맞는 출력값을 작성하시오.\\n\\n${code}`;
    categories[categoryIndex].problems[35].answer = sum.toString();
}

// 37번 문제: 이중 포인터 배열 - 2024년 3회 (랜덤화)
function generateCProblem37(categoryIndex) {
    const arrLength = 5 + Math.floor(Math.random() * 2);
    const arr = Array.from({length: arrLength}, () => Math.floor(Math.random() * 6) + 1);
    
    const operations = [
        { op: '(*(*arr+i) + i) % size', calc: (val, i, size) => (val + i) % size },
        { op: '(*(*arr+i) * 2) % size', calc: (val, i, size) => (val * 2) % size },
        { op: '(*(*arr+i) + size - i) % size', calc: (val, i, size) => (val + size - i) % size }
    ];
    
    const selected = operations[Math.floor(Math.random() * operations.length)];
    const outputIndex = 1 + Math.floor(Math.random() * (arrLength - 2));
    
    let result = [];
    for(let i = 0; i < arrLength; i++) {
        result[i] = selected.calc(arr[i], i, arrLength);
    }
    
    const answer = result[outputIndex];
    
    const code = `#include <stdio.h>\\n \\nvoid func(int** arr, int size){\\n  for(int i=0; i<size; i++){\\n     *(*arr + i) = ${selected.op};\\n  }\\n}\\n \\nint main(){\\n  int arr[] = {${arr.join(', ')}};\\n  int* p = arr;\\n  int** pp = &p;\\n  int num = 6;\\n  \\n  func(pp, ${arrLength});  \\n  num = arr[${outputIndex}];\\n  printf(\\\"%d\\\", num);  \\n \\n  return 0;\\n}`;
    
    categories[categoryIndex].problems[36].question = `다음은 C언어에 대한 문제이다. 아래 코드를 확인하여 알맞는 출력값을 작성하시오.\\n\\n${code}`;
    categories[categoryIndex].problems[36].answer = answer.toString();
}

// 38번 문제: 연결 리스트 재연결 - 2025년 1회 (랜덤화)
function generateCProblem38(categoryIndex) {
    const maxVal = 4 + Math.floor(Math.random() * 3);
    const targetVal = 2 + Math.floor(Math.random() * (maxVal - 2));
    
    // 리스트: maxVal, maxVal-1, ..., 1
    // reconnect 후: targetVal이 맨 앞으로
    let list = [];
    for(let i = maxVal; i >= 1; i--) {
        list.push(i);
    }
    
    // targetVal을 찾아서 맨 앞으로
    const idx = list.indexOf(targetVal);
    if(idx > 0) {
        list.splice(idx, 1);
        list.unshift(targetVal);
    }
    
    const result = list.join('');
    
    const code = `#include <stdio.h>   \\n#include <stdlib.h>  \\n \\ntypedef struct Data {\\n    int value;\\n    struct Data *next;\\n} Data;\\n \\nData* insert(Data* head, int value) {\\n    Data* new_node = (Data*)malloc(sizeof(Data));\\n    new_node->value = value;\\n    new_node->next = head;\\n    return new_node;\\n}\\n \\nData* reconnect(Data* head, int value) {\\n    if (head == NULL || head->value == value) return head;\\n    Data *prev = NULL, *curr = head;\\n    while (curr != NULL && curr->value != value) {\\n        prev = curr;\\n        curr = curr->next;\\n    }\\n \\n    if (curr != NULL && prev != NULL) {\\n        prev->next = curr->next;\\n        curr->next = head;\\n        head = curr;\\n    }\\n    return head;\\n}\\n \\nint main() {\\n \\n    Data *head = NULL, *curr;\\n    for (int i = 1; i <= ${maxVal}; i++)\\n        head = insert(head, i);\\n    head = reconnect(head, ${targetVal});\\n    for (curr = head; curr != NULL; curr = curr->next)\\n        printf(\\\"%d\\\", curr->value);\\n    return 0; \\n}`;
    
    categories[categoryIndex].problems[37].question = `다음은 C언어에 대한 문제이다. 아래 코드를 확인하여 알맞는 출력값을 작성하시오.\\n\\n${code}`;
    categories[categoryIndex].problems[37].answer = result;
}
// 39번 문제: 구조체 비트 연산 - 2025년 1회
function generateCProblem39(categoryIndex) {
    const masks = [0xA5, 0x5A, 0x3C, 0xC3];
    const mask = masks[Math.floor(Math.random() * masks.length)];
    
    const generateScores = () => Array.from({length: 3}, () => 
        0xA0 + Math.floor(Math.random() * 0x50)
    );
    
    const scores1 = generateScores();
    const scores2 = generateScores();
    
    function dec(enc) {
        return enc & mask;
    }
    
    const sum1 = dec(scores1[0]) + dec(scores1[1]) + dec(scores1[2]);
    const sum2 = dec(scores2[0]) + dec(scores2[1]) + dec(scores2[2]);
    const result = sum1 + sum2;
    
    const code = `#include <stdio.h>\\n \\ntypedef struct student {\\n    char* name;\\n    int score[3];\\n} Student;\\n \\nint dec(int enc) {\\n    return enc & 0x${mask.toString(16).toUpperCase()};\\n}\\n \\nint sum(Student* p) {\\n    return dec(p->score[0]) + dec(p->score[1]) + dec(p->score[2]);\\n}\\n \\nint main() {\\n    Student s[2] = { \\\"Kim\\\", {0x${scores1[0].toString(16).toUpperCase()}, 0x${scores1[1].toString(16).toUpperCase()}, 0x${scores1[2].toString(16).toUpperCase()}}, \\\"Lee\\\", {0x${scores2[0].toString(16).toUpperCase()}, 0x${scores2[1].toString(16).toUpperCase()}, 0x${scores2[2].toString(16).toUpperCase()}} };\\n    Student* p = s;\\n    int result = 0;\\n \\n    for (int i = 0; i < 2; i++) {\\n        result += sum(&s[i]);\\n    }\\n    printf(\\\"%d\\\", result);\\n    return 0;\\n}`;
    
    categories[categoryIndex].problems[38].question = `다음은 C언어에 대한 문제이다. 아래 코드를 확인하여 알맞는 출력값을 작성하시오.\\n\\n${code}`;
    categories[categoryIndex].problems[38].answer = result.toString();
}

// 40번 문제: 배열 정렬 및 삽입 - 2025년 1회 (랜덤화)
function generateCProblem40(categoryIndex) {
    const arrSize = 4 + Math.floor(Math.random() * 2);
    const chars = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
    const shuffled = chars.sort(() => Math.random() - 0.5).slice(0, arrSize);
    const data = shuffled.sort();
    const insertChar = String.fromCharCode(data[0].charCodeAt(0) + Math.floor(Math.random() * 3) + 1);
    
    const patterns = [
        { expr: `Data[${arrSize-1}]-Data[1]`, calc: () => data[arrSize-1].charCodeAt(0) - data[1].charCodeAt(0) },
        { expr: `Data[${arrSize-2}]-Data[0]`, calc: () => data[arrSize-2].charCodeAt(0) - data[0].charCodeAt(0) },
        { expr: `Data[${Math.floor(arrSize/2)}]-Data[0]`, calc: () => data[Math.floor(arrSize/2)].charCodeAt(0) - data[0].charCodeAt(0) }
    ];
    
    const selected = patterns[Math.floor(Math.random() * patterns.length)];
    const diff = selected.calc();
    
    // 삽입 로직
    const resultArr = [...data];
    let insertIdx = arrSize;
    for(let i = 0; i < arrSize; i++) {
        if(resultArr[i] > insertChar) {
            insertIdx = i;
            break;
        }
    }
    resultArr.splice(insertIdx, 0, insertChar);
    
    const result = `${diff} ${resultArr.join('')}`;
    
    const dataStr = data.map(c => `'${c}'`).join(', ');
    
    const code = `#include <stdio.h>\\nchar Data[${arrSize+1}] = {${dataStr}};\\nchar c;\\n \\nint main(){\\n    int i, temp, temp2;\\n \\n    c = '${insertChar}';\\n    printf(\\\"%d\\\\n\\\", ${selected.expr});\\n \\n    for(i=0;i<${arrSize+1};++i){\\n        if(Data[i]>c)\\n            break;\\n    }\\n \\n    temp = Data[i];\\n    Data[i] = c;\\n    i++;\\n \\n    for(;i<${arrSize+1};++i){\\n        temp2 = Data[i];\\n        Data[i] = temp;\\n        temp = temp2;\\n    }\\n \\n    for(i=0;i<${arrSize+1};i++){\\n        printf(\\\"%c\\\", Data[i]);\\n    }\\n}`;
    
    categories[categoryIndex].problems[39].question = `다음은 C언어에 대한 문제이다. 아래 코드를 확인하여 알맞는 출력값을 작성하시오.\\n\\n${code}`;
    categories[categoryIndex].problems[39].answer = result;
}

// 41번 문제: 2차원 배열 동적 할당 - 2025년 1회 (랜덤화)
function generateCProblem41(categoryIndex) {
    const rows = 3;
    const cols = 3;
    const base = 1 + Math.floor(Math.random() * 3);
    const data = Array.from({length: 9}, (_, i) => base + i + Math.floor(Math.random() * 2));
    
    const arr = Array(rows).fill(null).map(() => Array(cols).fill(0));
    
    for(let i = 0; i < rows * cols; i++) {
        const row = Math.floor(((i + 1) / rows) % rows);
        const col = (i + 1) % cols;
        arr[row][col] = data[i];
    }
    
    const operations = [
        {
            desc: '짝수 인덱스 1, 홀수 인덱스 -1',
            calc: () => {
                let sum = 0;
                for(let i = 0; i < rows * cols; i++) {
                    const val = arr[Math.floor(i / rows)][i % cols];
                    sum += val * (i % 2 === 0 ? 1 : -1);
                }
                return sum;
            },
            code: 'sum += arr[i / rows][i % cols] * (i % 2 == 0 ? 1 : -1);'
        },
        {
            desc: '전체 합',
            calc: () => {
                let sum = 0;
                for(let i = 0; i < rows * cols; i++) {
                    const val = arr[Math.floor(i / rows)][i % cols];
                    sum += val;
                }
                return sum;
            },
            code: 'sum += arr[i / rows][i % cols];'
        },
        {
            desc: '홀수 인덱스 2배',
            calc: () => {
                let sum = 0;
                for(let i = 0; i < rows * cols; i++) {
                    const val = arr[Math.floor(i / rows)][i % cols];
                    sum += val * (i % 2 === 1 ? 2 : 1);
                }
                return sum;
            },
            code: 'sum += arr[i / rows][i % cols] * (i % 2 == 1 ? 2 : 1);'
        }
    ];
    
    const selected = operations[Math.floor(Math.random() * operations.length)];
    const sum = selected.calc();
    
    const code = `#include <stdio.h>\\n#include <stdlib.h>\\n \\nvoid set(int** arr, int* data, int rows, int cols) {\\n    for (int i = 0; i < rows * cols; ++i) {\\n        arr[((i + 1) / rows) % rows][(i + 1) % cols] = data[i];\\n    }\\n}\\n \\nint main() {\\n    int rows = ${rows}, cols = ${cols}, sum = 0;\\n    int data[] = {${data.join(', ')}}; \\n    int** arr;\\n    arr = (int**) malloc(sizeof(int*) * rows);\\n    for (int i = 0; i < cols; i++) {\\n        arr[i] = (int*) malloc(sizeof(int) * cols);\\n    }\\n \\n    set(arr, data, rows, cols);\\n \\n    for (int i = 0; i < rows * cols; i++) {\\n        ${selected.code}\\n    }\\n \\n    for(int i=0; i<rows; i++) {\\n        free(arr[i]);\\n    }\\n    free(arr);\\n \\n    printf(\\\"%d\\\", sum);\\n}`;
    
    categories[categoryIndex].problems[40].question = `다음은 C언어에 대한 문제이다. 아래 코드를 확인하여 알맞는 출력값을 작성하시오.\\n\\n${code}`;
    categories[categoryIndex].problems[40].answer = sum.toString();
}

// 42번 문제: 큐 구조체 - 2025년 2회 (랜덤화)
function generateCProblem42(categoryIndex) {
    const size = 3;
    const val1 = 1 + Math.floor(Math.random() * 5);
    const val2 = val1 + 1 + Math.floor(Math.random() * 5);
    const val3 = val2 + 1 + Math.floor(Math.random() * 5);
    
    const operations = [val1, val2, val3];
    
    const queue = [];
    queue.push(operations[0]);
    queue.push(operations[1]);
    queue.shift();
    queue.push(operations[2]);
    
    const first = queue.shift();
    const second = queue.shift();
    
    const result = `${first} 그리고 ${second}`;
    
    const code = `#include <stdio.h>\\n#define SIZE ${size}\\n \\ntypedef struct {\\n    int a[SIZE];\\n    int front;\\n    int rear;\\n} Queue;\\n \\nvoid enq(Queue* q, int val){\\n    q->a[q->rear] = val; \\n    q->rear = (q->rear + 1) % SIZE;\\n}\\n \\nint deq(Queue* q) {\\n    int val = q->a[q->front];\\n    q->front = (q->front + 1) % SIZE;\\n    return val;\\n}\\n \\nint main() {\\n    Queue q = {{0}, 0, 0};\\n \\n    enq(&q,${operations[0]}); enq(&q,${operations[1]}); deq(&q); enq(&q, ${operations[2]});\\n    \\n    int first = deq(&q);\\n    int second = deq(&q);\\n    printf(\\\"%d 그리고 %d\\\", first, second);\\n    \\n    return 0;\\n}`;
    
    categories[categoryIndex].problems[41].question = `다음은 C언어의 문제이다. 아래 코드를 보고 알맞는 출력값을 작성하시오.\\n\\n${code}`;
    categories[categoryIndex].problems[41].answer = result;
}

// 43번 문제: 구조체 배열 포인터 - 2025년 2회
function generateCProblem43(categoryIndex) {
    const vals = Array.from({length: 3}, (_, i) => ({
        x: (i + 1) * 2 - 1 + Math.floor(Math.random() * 3),
        y: (i + 1) * 2 + Math.floor(Math.random() * 3)
    }));
    
    const patterns = [
        { target: 1, source: 2, result: () => `${vals[2].x} 그리고 ${vals[2].y}` },
        { target: 0, source: 2, result: () => `${vals[2].x} 그리고 ${vals[2].y}` },
        { target: 2, source: 0, result: () => `${vals[0].x} 그리고 ${vals[0].y}` },
        { target: 1, source: 0, result: () => `${vals[0].x} 그리고 ${vals[0].y}` }
    ];
    
    const selected = patterns[Math.floor(Math.random() * patterns.length)];
    const result = selected.result();
    
    const code = `#include <stdio.h>\\n \\nstruct dat {\\n    int x;\\n    int y;\\n};\\n \\nint main() {\\n    struct dat a[] = {{${vals[0].x}, ${vals[0].y}}, {${vals[1].x}, ${vals[1].y}}, {${vals[2].x}, ${vals[2].y}}};\\n    struct dat* ptr = a;\\n    struct dat** pptr = &ptr;\\n \\n    (*pptr)[${selected.target}] = (*pptr)[${selected.source}];\\n    printf(\\\"%d 그리고 %d\\\", a[${selected.target}].x, a[${selected.target}].y);\\n \\n    return 0;\\n}`;
    
    categories[categoryIndex].problems[42].question = `다음은 C언어의 문제이다. 아래 코드를 보고 알맞는 출력값을 작성하시오.\\n\\n${code}`;
    categories[categoryIndex].problems[42].answer = result;
}

// 44번 문제: 연결 리스트 재배치 - 2025년 2회
function generateCProblem44(categoryIndex) {
    const val1 = 1 + Math.floor(Math.random() * 3);
    const val2 = val1 + 1;
    const val3 = val2 + 1;
    
    const patterns = [
        {
            setup: 'a.n = &b; b.n = &c; c.n = NULL;\\n    c.n = &a; a.n = &b; b.n = NULL;',
            head: 'c',
            result: `${val3} ${val1} ${val2}`
        },
        {
            setup: 'b.n = &c; c.n = &a; a.n = NULL;\\n    a.n = &b; b.n = &c; c.n = NULL;',
            head: 'a',
            result: `${val1} ${val2} ${val3}`
        },
        {
            setup: 'c.n = &b; b.n = &a; a.n = NULL;\\n    b.n = &a; a.n = &c; c.n = NULL;',
            head: 'b',
            result: `${val2} ${val1} ${val3}`
        }
    ];
    
    const selected = patterns[Math.floor(Math.random() * patterns.length)];
    
    const code = `#include <stdio.h>\\n#include <stdlib.h>\\n \\nstruct node {\\n    int p;\\n    struct node* n;\\n};\\n \\nint main() {\\n    struct node a = {${val1}, NULL};\\n    struct node b = {${val2}, NULL};\\n    struct node c = {${val3}, NULL};\\n \\n    ${selected.setup}\\n    struct node* head = &${selected.head};\\n    printf(\\\"%d %d %d\\\", head->p, head->n->p, head->n->n->p);\\n    return 0;\\n}`;
    
    categories[categoryIndex].problems[43].question = `다음은 C언어의 문제이다. 아래 코드를 보고 알맞는 출력값을 작성하시오.\\n\\n${code}`;
    categories[categoryIndex].problems[43].answer = selected.result;
}

// 45번 문제: 문자열 역순 연결 리스트 - 2025년 2회
function generateCProblem45(categoryIndex) {
    const strings = [
        'BEST', 'CODE', 'WORK', 'TEST', 'PASS', 'GOOD', 'NICE', 'COOL',
        'HELLO', 'WORLD', 'PYTHON', 'DATA', 'INFO', 'DEBUG', 'ERROR'
    ];
    const str = strings[Math.floor(Math.random() * strings.length)];
    const result = str.split('').reverse().join('');
    
    const code = `#include <stdio.h>\\n#include <stdlib.h>\\n \\nstruct node {\\n    char c;\\n    struct node* p;\\n};\\n \\nstruct node* func(char* s) {\\n    struct node* h = NULL, *n;\\n    \\n    while(*s) {\\n        n = malloc(sizeof(struct node));\\n        n->c = *s++;\\n        n->p = h;\\n        h = n;\\n    }\\n    \\n    return h;\\n}\\n \\nint main() {\\n    struct node* n = func(\\\"${str}\\\");\\n    \\n    while(n) {\\n        putchar(n->c);\\n        struct node* t = n;\\n        n = n->p;\\n        free(t);\\n    }\\n    \\n    return 0;\\n}`;
    
    categories[categoryIndex].problems[44].question = `다음은 C언어의 문제이다. 아래 코드를 보고 알맞는 출력값을 작성하시오.\\n\\n${code}`;
    categories[categoryIndex].problems[44].answer = result;
}

// ====================== 2025년 3회 기출 랜덤 문제 ======================

// C언어 46번: struct 포인터 연산
function generateCProblem46(categoryIndex) {
    const genStr = () => {
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        return chars[Math.floor(Math.random() * 26)] + chars[Math.floor(Math.random() * 26)];
    };
    const str0 = genStr();
    const str1 = genStr();
    const str2 = genStr();
    const answer = str1[1]; // p->g + (p->i - 1) = str1의 두번째 문자

    const code = `#include <stdio.h>\\n\\nstruct Test {\\n    int i;\\n    const char *g;\\n};\\n\\nint main() {\\n    struct Test test[] = {{1, "${str0}"}, {2, "${str1}"}, {3, "${str2}"}};\\n    struct Test *p = &test[1];\\n    printf("%s", p->g + (p->i - 1));\\n    return 0;\\n}`;

    categories[categoryIndex].problems[45].question = `다음 C언어 코드의 출력값을 작성하시오.\\n\\n${code}`;
    categories[categoryIndex].problems[45].answer = answer;
}

// C언어 47번: 문자열 길이 + putchar
function generateCProblem47(categoryIndex) {
    const strings = [
        'REPUBLICOFKOREA', 'INFORMATIONTECH', 'COMPUTERPROGRAMM',
        'SOFTWAREDEVELOP', 'ALGORITHMSTUDY', 'DATABASESYSTEM'
    ];
    const str = strings[Math.floor(Math.random() * strings.length)];
    const offset = 2 + Math.floor(Math.random() * 3); // 2, 3, 4 중 하나
    const answer = str[str.length - offset];

    const code = `#include <stdio.h>\\n\\nint main(void) {\\n    char str[] = "${str}";\\n    int a = 0;\\n\\n    while (str[a] != '\\\\0')\\n        ++a;\\n\\n    putchar(str[a - ${offset}]);\\n    return 0;\\n}`;

    categories[categoryIndex].problems[46].question = `다음 C언어 코드의 출력값을 작성하시오.\\n\\n${code}`;
    categories[categoryIndex].problems[46].answer = answer;
}

// C언어 48번: 연결리스트 + XOR 연산
function generateCProblem48(categoryIndex) {
    const u1 = 3 + Math.floor(Math.random() * 8);
    const u2 = 5 + Math.floor(Math.random() * 8);
    const u3 = 9 + Math.floor(Math.random() * 8);
    const xorVal = 20 + Math.floor(Math.random() * 30);
    const addVal = 50 + Math.floor(Math.random() * 80);

    // 시뮬레이션: t3->t2->t1 순서
    let sum = 0;
    sum = sum * 3 + u3;
    sum = sum * 3 + u2;
    sum = sum * 3 + u1;
    const result = (sum ^ xorVal) + addVal;

    const code = `#include <stdio.h>\\n\\nstruct Node {\\n    struct Node* next;\\n    unsigned int x;\\n};\\n\\nint main() {\\n    struct Node t1 = { 0, ${u1}u };\\n    struct Node t2 = { 0, ${u2}u };\\n    struct Node t3 = { 0, ${u3}u };\\n\\n    t3.next = &t2;\\n    t2.next = &t1;\\n\\n    struct Node* curr = &t3;\\n    int sum = 0;\\n\\n    while (curr) {\\n        sum = sum * 3 + curr->x;\\n        curr = curr->next;\\n    }\\n\\n    sum = (sum ^ ${xorVal}u) + ${addVal}u;\\n\\n    printf("%u\\\\n", sum);\\n}`;

    categories[categoryIndex].problems[47].question = `다음 C언어 코드의 출력값을 작성하시오.\\n\\n${code}`;
    categories[categoryIndex].problems[47].answer = result.toString();
}

// C언어 49번: 비트 연산 (x>5이면 항상 0)
function generateCProblem49(categoryIndex) {
    const x = 6 + Math.floor(Math.random() * 5); // 항상 6 이상
    const y = 3 + Math.floor(Math.random() * 6);

    // 시뮬레이션
    let z;
    z = (y % 3 < 3) ? 2 : 1;  // y%3은 0,1,2 전부 3미만 → z=2
    z = z & (z >> 1);           // 2 & 1 = 0
    z = (x > 5 && z <= 3) ? z * x : Math.floor(z / x); // 0 * x = 0

    const code = `#include <stdio.h>\\nint main() {\\n    int x=${x}, y=${y}, z;\\n    z = y%3<3 ? 2 : 1;\\n    z = z & z >> 1;\\n    z = x>5 && z<=3 ? z*x : z/x;\\n    printf("%d", z);\\n    return 0;\\n}`;

    categories[categoryIndex].problems[48].question = `다음 C언어 코드의 출력값을 작성하시오.\\n\\n${code}`;
    categories[categoryIndex].problems[48].answer = z.toString();
}

// Java 17번: interface implements 빈칸
function generateJavaProblem17(categoryIndex) {
    const interfaces = [
        { iface: 'Machine', method: 'run', className: 'WashingMachine', msg: 'Washing machine running' },
        { iface: 'Animal', method: 'sound', className: 'Dog', msg: 'Woof!' },
        { iface: 'Vehicle', method: 'move', className: 'Car', msg: 'Car is moving' },
        { iface: 'Printable', method: 'print', className: 'Document', msg: 'Printing document' }
    ];
    const selected = interfaces[Math.floor(Math.random() * interfaces.length)];

    const code = `interface ${selected.iface} {\\n    void ${selected.method}();\\n}\\n\\nclass ${selected.className} (____빈칸____) ${selected.iface} {\\n    public void ${selected.method}() {\\n        System.out.println("${selected.msg}");\\n    }\\n}\\n\\npublic class Main {\\n    public static void main(String[] args) {\\n        ${selected.className} obj = new ${selected.className}();\\n        obj.${selected.method}();\\n    }\\n}`;

    categories[categoryIndex].problems[16].question = `다음 Java 코드에서 빈칸에 들어갈 올바른 키워드를 작성하시오.\\n\\n${code}`;
    categories[categoryIndex].problems[16].answer = 'implements';
}

// Java 18번: super 키워드 빈칸
function generateJavaProblem18(categoryIndex) {
    const sideLen = 5 + Math.floor(Math.random() * 10);
    const area = sideLen * sideLen;

    const code = `class Rectangle {\\n    int width, height;\\n\\n    Rectangle(int width, int height) {\\n        this.width = width;\\n        this.height = height;\\n    }\\n}\\n\\nclass Square extends Rectangle {\\n    Square(int a) {\\n        ____(a, a);\\n    }\\n\\n    int getSquareArea() {\\n        return width * height;\\n    }\\n}\\n\\npublic class Main {\\n    public static void main(String[] args) {\\n        Square sq = new Square(${sideLen});\\n        System.out.println(sq.getSquareArea());\\n    }\\n}`;

    categories[categoryIndex].problems[17].question = `다음 Java 코드에서 밑줄에 알맞은 단어를 작성하시오.\\n\\n${code}`;
    categories[categoryIndex].problems[17].answer = 'super';
}

// Java 19번: enum 코드 추적
function generateJavaProblem19(categoryIndex) {
    // enum 구조: values()[name().length()] → A의 이름 길이 = 1 → values()[1] = B
    const enumSets = [
        { name: 'Tri', vals: [['A','A'],['B','AB'],['C','ABC']], answer: 'AB' },
        { name: 'Color', vals: [['R','RED'],['G','GREEN'],['B','BLUE']], answer: 'GREEN' },
        { name: 'Dir', vals: [['N','NORTH'],['S','SOUTH'],['E','EAST']], answer: 'SOUTH' }
    ];
    const selected = enumSets[Math.floor(Math.random() * enumSets.length)];
    const [n, v] = selected.vals;

    const enumBody = selected.vals.map(([k, val]) => `    ${k}("${val}")`).join(', ');

    const code = `enum ${selected.name} {\\n${enumBody};\\n\\n    private String code;\\n\\n    ${selected.name}(String code) {\\n        this.code = code;\\n    }\\n\\n    public String code() {\\n        return code;\\n    }\\n}\\n\\npublic class Main {\\n    public static void main(String[] args) {\\n        ${selected.name} t = ${selected.name}.values()[${selected.name}.${selected.vals[0][0]}.name().length()];\\n        System.out.print(t.code());\\n    }\\n}`;

    categories[categoryIndex].problems[18].question = `다음 Java 코드의 출력값을 작성하시오.\\n\\n${code}`;
    categories[categoryIndex].problems[18].answer = selected.answer;
}

// Python 15번: enumerate + sum + len
function generatePythonProblem15(categoryIndex) {
    const listCount = 3 + Math.floor(Math.random() * 2); // 3~4개 리스트
    const data = [];

    for (let i = 0; i < listCount; i++) {
        const len = 2 + Math.floor(Math.random() * 4);
        const row = Array.from({length: len}, () => Math.floor(Math.random() * 9) + 1);
        data.push(row);
    }

    // 정답 계산
    const result = {};
    data.forEach((lis, index) => {
        result[index] = `(${lis.reduce((a, b) => a + b, 0)}, ${lis.length})`;
    });

    const resultStr = '{' + Object.entries(result).map(([k, v]) => `${k}: ${v}`).join(', ') + '}';
    const dataStr = data.map(row => `    [${row.join(', ')}]`).join(',\n');

    const code = `data = [\n${dataStr}\n]\n\nresult = {}\n\nfor index, lis in enumerate(data):\n    list_sum = sum(lis)\n    list_len = len(lis)\n\n    result[index] = (list_sum, list_len)\n\nprint(result)`;

    categories[categoryIndex].problems[14].question = `다음 Python 코드의 출력값을 작성하시오.\n\n${code}`;
    categories[categoryIndex].problems[14].answer = resultStr;
}
// ====================== 2025년 3회 기출 랜덤 문제 끝 ======================
// ====================== C언어 랜덤 문제 생성 ======================