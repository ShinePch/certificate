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

// ========================== 페이지 교체 알고리즘 시작 ==========================
function generateRandomPageReplacementProblem(categoryIndex) {
    const algorithms = ['FIFO', 'LRU', 'LFU'];
    const algorithm = algorithms[Math.floor(Math.random() * algorithms.length)];
    
    const frameCount = 3 + Math.floor(Math.random() * 2);
    
    const pageCount = 12 + Math.floor(Math.random() * 9);
    const pages = [];
    for (let i = 0; i < pageCount; i++) {
        pages.push(Math.floor(Math.random() * 10));
    }
    
    const pageString = pages.join(' ');
    
    let faults = 0;
    if (algorithm === 'FIFO') {
        faults = simulateFIFO(pages, frameCount);
    } else if (algorithm === 'LRU') {
        faults = simulateLRU(pages, frameCount);
    } else if (algorithm === 'LFU') {
        faults = simulateLFU(pages, frameCount);
    }
    
    categories[categoryIndex].problems[currentProblemIndex].question = 
        `${algorithm} 페이지 교체 알고리즘에 따른 페이지 부재 횟수를 작성하시오. (프레임 ${frameCount}개)\n\n페이지 참조 순서: ${pageString}`;
    
    categories[categoryIndex].problems[currentProblemIndex].answer = `${faults}`;
}

function simulateFIFO(pages, frameCount) {
    const frames = [];
    let pageFaults = 0;
    
    for (let page of pages) {
        if (!frames.includes(page)) {
            pageFaults++;
            if (frames.length < frameCount) {
                frames.push(page);
            } else {
                frames.shift();
                frames.push(page);
            }
        }
    }
    
    return pageFaults;
}

function simulateLRU(pages, frameCount) {
    const frames = [];
    let pageFaults = 0;
    
    for (let i = 0; i < pages.length; i++) {
        const page = pages[i];
        
        if (!frames.includes(page)) {
            pageFaults++;
            if (frames.length < frameCount) {
                frames.push(page);
            } else {
                let lruIndex = 0;
                let minLastUsed = i;
                
                for (let j = 0; j < frames.length; j++) {
                    let lastUsed = -1;
                    for (let k = i - 1; k >= 0; k--) {
                        if (pages[k] === frames[j]) {
                            lastUsed = k;
                            break;
                        }
                    }
                    
                    if (lastUsed < minLastUsed) {
                        minLastUsed = lastUsed;
                        lruIndex = j;
                    }
                }
                
                frames[lruIndex] = page;
            }
        }
    }
    
    return pageFaults;
}

function simulateLFU(pages, frameCount) {
    const frames = [];
    const frequency = {};
    let pageFaults = 0;
    
    for (let page of pages) {
        frequency[page] = (frequency[page] || 0) + 1;
        
        if (!frames.includes(page)) {
            pageFaults++;
            if (frames.length < frameCount) {
                frames.push(page);
            } else {
                let lfuIndex = 0;
                let minFreq = frequency[frames[0]];
                
                for (let j = 1; j < frames.length; j++) {
                    if (frequency[frames[j]] < minFreq) {
                        minFreq = frequency[frames[j]];
                        lfuIndex = j;
                    }
                }
                
                frames[lfuIndex] = page;
            }
        }
    }
    
    return pageFaults;
}
// ========================== 페이지 교체 알고리즘 끝 ==========================

// ========================== 스케줄링 알고리즘 시작 ==========================
function generateRandomSchedulingProblem(categoryIndex) {
    const algorithms = ['FCFS', 'SJF', 'RR'];
    const algorithm = algorithms[Math.floor(Math.random() * algorithms.length)];
    
    const processCount = 3 + Math.floor(Math.random() * 3);
    const processes = [];
    
    for (let i = 0; i < processCount; i++) {
        processes.push({
            name: `P${i + 1}`,
            arrival: i === 0 ? 0 : Math.floor(Math.random() * 5),
            burst: 2 + Math.floor(Math.random() * 7)
        });
    }
    
    processes.sort((a, b) => a.arrival - b.arrival);
    
    let avgWaitTime = 0;
    let quantum = 0;
    
    if (algorithm === 'FCFS') {
        avgWaitTime = simulateFCFS(processes);
    } else if (algorithm === 'SJF') {
        avgWaitTime = simulateSJF(processes);
    } else if (algorithm === 'RR') {
        quantum = 2 + Math.floor(Math.random() * 2);
        avgWaitTime = simulateRR(processes, quantum);
    }
    
    let questionTable = '\n프로세스 | 도착시간 | 실행시간\n--------|---------|--------\n';
    processes.forEach(p => {
        questionTable += `${p.name}      | ${p.arrival}       | ${p.burst}\n`;
    });
    
    let questionText = `${algorithm} 스케줄링의 평균 대기시간을 계산하시오.${questionTable}`;
    
    if (algorithm === 'RR') {
        questionText = `RR(Round Robin) 스케줄링의 평균 대기시간을 계산하시오. (타임 슬라이스 = ${quantum})${questionTable}`;
    }
    
    categories[categoryIndex].problems[currentProblemIndex].question = questionText;
    categories[categoryIndex].problems[currentProblemIndex].answer = avgWaitTime.toFixed(2);
}

function simulateFCFS(processes) {
    let currentTime = 0;
    let totalWaitTime = 0;
    
    processes.forEach(p => {
        if (currentTime < p.arrival) {
            currentTime = p.arrival;
        }
        
        const waitTime = currentTime - p.arrival;
        totalWaitTime += waitTime;
        
        currentTime += p.burst;
    });
    
    return totalWaitTime / processes.length;
}

function simulateSJF(processes) {
    const remaining = [...processes];
    const completed = [];
    let currentTime = 0;
    let totalWaitTime = 0;
    
    while (remaining.length > 0) {
        const available = remaining.filter(p => p.arrival <= currentTime);
        
        if (available.length === 0) {
            currentTime = remaining[0].arrival;
            continue;
        }
        
        available.sort((a, b) => a.burst - b.burst);
        const selected = available[0];
        
        const waitTime = currentTime - selected.arrival;
        totalWaitTime += waitTime;
        
        currentTime += selected.burst;
        
        const index = remaining.indexOf(selected);
        remaining.splice(index, 1);
        completed.push(selected);
    }
    
    return totalWaitTime / processes.length;
}

function simulateRR(processes, quantum) {
    const queue = [];
    const remainingBurst = {};
    const waitTime = {};
    const arrivalTime = {};
    
    processes.forEach(p => {
        remainingBurst[p.name] = p.burst;
        waitTime[p.name] = 0;
        arrivalTime[p.name] = p.arrival;
    });
    
    let currentTime = 0;
    let index = 0;
    
    queue.push(processes[0]);
    index++;
    
    while (queue.length > 0) {
        const current = queue.shift();
        
        if (currentTime < arrivalTime[current.name]) {
            currentTime = arrivalTime[current.name];
        }
        
        const executeTime = Math.min(quantum, remainingBurst[current.name]);
        
        currentTime += executeTime;
        remainingBurst[current.name] -= executeTime;
        
        while (index < processes.length && processes[index].arrival <= currentTime) {
            queue.push(processes[index]);
            index++;
        }
        
        if (remainingBurst[current.name] > 0) {
            queue.push(current);
        } else {
            waitTime[current.name] = currentTime - arrivalTime[current.name] - processes.find(p => p.name === current.name).burst;
        }
    }
    
    let totalWaitTime = 0;
    processes.forEach(p => {
        totalWaitTime += waitTime[p.name];
    });
    
    return totalWaitTime / processes.length;
}
// ========================== 스케줄링 알고리즘 끝 ==========================

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
function generateRandomPythonProblem(categoryIndex, difficulty) {
    if (difficulty === 1) {
        // 간단한 문제 (레벨 1)
        generateSimplePythonProblem(categoryIndex);
    } else {
        // 복잡한 문제 (레벨 2)
        generateComplexPythonProblem(categoryIndex);
    }
}

// 레벨 1: 간단한 문제 (리스트 슬라이싱, 비트 연산)
function generateSimplePythonProblem(categoryIndex) {
    const problemTypes = ['list_slice', 'bit_operation', 'list_index'];
    const type = problemTypes[Math.floor(Math.random() * problemTypes.length)];
    
    let code = '';
    let answer = '';
    
    if (type === 'list_slice') {
        // 리스트 슬라이싱
        const length = 5 + Math.floor(Math.random() * 3);
        const lst = Array.from({length}, (_, i) => i + 1);
        const step = [1, 2, -1][Math.floor(Math.random() * 3)];
        
        const sliceTypes = [
            { slice: '[::2]', calc: lst.filter((_, i) => i % 2 === 0) },
            { slice: '[1::2]', calc: lst.filter((_, i) => i % 2 === 1) },
            { slice: '[::-1]', calc: [...lst].reverse() },
            { slice: '[::2]', calc: lst.filter((_, i) => i % 2 === 0) }
        ];
        
        const selected = sliceTypes[Math.floor(Math.random() * sliceTypes.length)];
        
        code = `lst = ${JSON.stringify(lst)}\nprint(sum(lst${selected.slice}))`;
        answer = selected.calc.reduce((a, b) => a + b, 0).toString();
        
    } else if (type === 'bit_operation') {
        // 비트 연산
        const num = 10 + Math.floor(Math.random() * 90);
        const shift = 1 + Math.floor(Math.random() * 3);
        
        const operations = [
            { op: '>>', calc: num >> shift, symbol: '>>' },
            { op: '<<', calc: num << shift, symbol: '<<' }
        ];
        
        const selected = operations[Math.floor(Math.random() * operations.length)];
        
        code = `a = ${num}\nresult = a ${selected.symbol} ${shift}\nprint(result)`;
        answer = selected.calc.toString();
        
    } else {
        // 리스트 인덱싱
        const length = 5 + Math.floor(Math.random() * 3);
        const lst = Array.from({length}, (_, i) => (i + 1) * 10);
        const index = Math.floor(Math.random() * length);
        
        code = `lst = ${JSON.stringify(lst)}\nprint(lst[${index}])`;
        answer = lst[index].toString();
    }
    
    categories[categoryIndex].problems[currentProblemIndex].question = 
        `다음 Python 코드의 출력값을 작성하시오.\n\n${code}`;
    categories[categoryIndex].problems[currentProblemIndex].answer = answer;
}

// 레벨 2: 복잡한 문제 (반복문, 함수)
function generateComplexPythonProblem(categoryIndex) {
    const problemTypes = ['loop_sum', 'function_call', 'list_comprehension'];
    const type = problemTypes[Math.floor(Math.random() * problemTypes.length)];
    
    let code = '';
    let answer = '';
    
    if (type === 'loop_sum') {
        // 반복문 합계
        const start = Math.floor(Math.random() * 3);
        const end = 5 + Math.floor(Math.random() * 5);
        
        let sum = 0;
        for (let i = start; i < end; i++) {
            sum += i;
        }
        
        code = `result = 0\nfor i in range(${start}, ${end}):\n    result += i\nprint(result)`;
        answer = sum.toString();
        
    } else if (type === 'function_call') {
        // 함수 호출
        const a = 5 + Math.floor(Math.random() * 15);
        const b = 5 + Math.floor(Math.random() * 15);
        const defaultVal = 10 + Math.floor(Math.random() * 10);
        
        const useDefault = Math.random() > 0.5;
        
        if (useDefault) {
            code = `def add(x, y=${defaultVal}):\n    return x + y\n\nprint(add(${a}))`;
            answer = (a + defaultVal).toString();
        } else {
            code = `def add(x, y=${defaultVal}):\n    return x + y\n\nprint(add(${a}, ${b}))`;
            answer = (a + b).toString();
        }
        
    } else {
        // 리스트 + 반복문
        const length = 4 + Math.floor(Math.random() * 4);
        const lst = Array.from({length}, (_, i) => (i + 1) * 2);
        
        let result = 0;
        for (let num of lst) {
            if (num % 4 === 0) {
                result += num;
            }
        }
        
        code = `lst = ${JSON.stringify(lst)}\nresult = 0\nfor num in lst:\n    if num % 4 == 0:\n        result += num\nprint(result)`;
        answer = result.toString();
    }
    
    categories[categoryIndex].problems[currentProblemIndex].question = 
        `다음 Python 코드의 출력값을 작성하시오.\n\n${code}`;
    categories[categoryIndex].problems[currentProblemIndex].answer = answer;
}
// ========================== Python 알고리즘 끝 ==========================

// ========================== C언어 알고리즘 시작 ==========================
function generateRandomCProblem(categoryIndex) {
    const problemTypes = ['loop', 'array', 'pointer', 'conditional'];
    const type = problemTypes[Math.floor(Math.random() * problemTypes.length)];
    
    let code = '';
    let answer = '';
    
    if (type === 'loop') {
        // 반복문 문제
        const start = Math.floor(Math.random() * 3);
        const end = 5 + Math.floor(Math.random() * 6);
        
        let sum = 0;
        for (let i = start; i <= end; i++) {
            sum += i;
        }
        
        code = `#include <stdio.h>\\n\\nint main() {\\n  int sum = 0;\\n  for(int i = ${start}; i <= ${end}; i++) {\\n    sum += i;\\n  }\\n  printf(\\\"%d\\\", sum);\\n  return 0;\\n}`;
        answer = sum.toString();
        
    } else if (type === 'array') {
        // 배열 문제
        const length = 4 + Math.floor(Math.random() * 4);
        const arr = Array.from({length}, (_, i) => (i + 1) * 10);
        const sum = arr.reduce((a, b) => a + b, 0);
        
        code = `#include <stdio.h>\\n\\nint main() {\\n  int arr[] = {${arr.join(', ')}};\\n  int sum = 0;\\n  for(int i = 0; i < ${length}; i++) {\\n    sum += arr[i];\\n  }\\n  printf(\\\"%d\\\", sum);\\n  return 0;\\n}`;
        answer = sum.toString();
        
    } else if (type === 'pointer') {
        // 포인터 문제
        const a = 10 + Math.floor(Math.random() * 20);
        const b = 10 + Math.floor(Math.random() * 20);
        
        code = `#include <stdio.h>\\n\\nint main() {\\n  int a = ${a};\\n  int *p = &a;\\n  *p = ${b};\\n  printf(\\\"%d\\\", a);\\n  return 0;\\n}`;
        answer = b.toString();
        
    } else {
        // 조건문 문제
        const a = 5 + Math.floor(Math.random() * 10);
        const b = 5 + Math.floor(Math.random() * 10);
        const result = a > b ? a * 2 : b * 2;
        
        code = `#include <stdio.h>\\n\\nint main() {\\n  int a = ${a};\\n  int b = ${b};\\n  int c = (a > b) ? a * 2 : b * 2;\\n  printf(\\\"%d\\\", c);\\n  return 0;\\n}`;
        answer = result.toString();
    }
    
    categories[categoryIndex].problems[currentProblemIndex].question = 
        `다음 C언어 코드의 출력값을 작성하시오.\\n\\n${code}`;
    
    categories[categoryIndex].problems[currentProblemIndex].answer = answer;
}
// ========================== C언어 알고리즘 끝 ==========================

// ========================== C언어 세분화 알고리즘 시작 ==========================
function generateCategorizedCProblem(categoryIndex, selectedType) {
    let code = '';
    let answer = '';
    
    // ========== 정렬 알고리즘 ==========
    if (selectedType === 'selectionSort') {
        const arr = Array.from({length: 5}, () => Math.floor(Math.random() * 50) + 10);
        const sorted = [...arr].sort((a, b) => a - b);
        
        code = `#include <stdio.h>\\n\\nint main() {\\n  int arr[] = {${arr.join(', ')}};\\n  int i, j, min, temp;\\n  for(i = 0; i < 4; i++) {\\n    min = i;\\n    for(j = i + 1; j < 5; j++) {\\n      if(arr[j] < arr[min])\\n        min = j;\\n    }\\n    temp = arr[i];\\n    arr[i] = arr[min];\\n    arr[min] = temp;\\n  }\\n  for(i = 0; i < 5; i++)\\n    printf(\\\"%d \\\", arr[i]);\\n  return 0;\\n}`;
        answer = sorted.join(' ');
    }
    
    else if (selectedType === 'bubbleSort') {
        const arr = Array.from({length: 5}, () => Math.floor(Math.random() * 50) + 10);
        const sorted = [...arr].sort((a, b) => a - b);
        
        code = `#include <stdio.h>\\n\\nint main() {\\n  int arr[] = {${arr.join(', ')}};\\n  int i, j, temp;\\n  for(i = 0; i < 4; i++) {\\n    for(j = 0; j < 4 - i; j++) {\\n      if(arr[j] > arr[j+1]) {\\n        temp = arr[j];\\n        arr[j] = arr[j+1];\\n        arr[j+1] = temp;\\n      }\\n    }\\n  }\\n  for(i = 0; i < 5; i++)\\n    printf(\\\"%d \\\", arr[i]);\\n  return 0;\\n}`;
        answer = sorted.join(' ');
    }
    
    else if (selectedType === 'insertionSort') {
        const arr = Array.from({length: 5}, () => Math.floor(Math.random() * 50) + 10);
        const sorted = [...arr].sort((a, b) => a - b);
        
        code = `#include <stdio.h>\\n\\nint main() {\\n  int arr[] = {${arr.join(', ')}};\\n  int i, j, key;\\n  for(i = 1; i < 5; i++) {\\n    key = arr[i];\\n    j = i - 1;\\n    while(j >= 0 && arr[j] > key) {\\n      arr[j+1] = arr[j];\\n      j--;\\n    }\\n    arr[j+1] = key;\\n  }\\n  for(i = 0; i < 5; i++)\\n    printf(\\\"%d \\\", arr[i]);\\n  return 0;\\n}`;
        answer = sorted.join(' ');
    }
    
    // ========== 연산 ==========
    else if (selectedType === 'logicalOp') {
        const a = Math.floor(Math.random() * 10) + 5;
        const b = Math.floor(Math.random() * 10) + 5;
        const result = (a > 10 && b > 10) ? 1 : (a > 5 || b > 5) ? 2 : 0;
        
        code = `#include <stdio.h>\\n\\nint main() {\\n  int a = ${a}, b = ${b};\\n  int result;\\n  if(a > 10 && b > 10)\\n    result = 1;\\n  else if(a > 5 || b > 5)\\n    result = 2;\\n  else\\n    result = 0;\\n  printf(\\\"%d\\\", result);\\n  return 0;\\n}`;
        answer = result.toString();
    }
    
    else if (selectedType === 'bitOp') {
        const a = Math.floor(Math.random() * 16) + 10;
        const shift = Math.floor(Math.random() * 2) + 1;
        const result = a << shift;
        
        code = `#include <stdio.h>\\n\\nint main() {\\n  int a = ${a};\\n  int result = a << ${shift};\\n  printf(\\\"%d\\\", result);\\n  return 0;\\n}`;
        answer = result.toString();
    }
    
    // ========== 조건문 ==========
    else if (selectedType === 'ifStmt') {
        const a = Math.floor(Math.random() * 20) + 10;
        const b = Math.floor(Math.random() * 20) + 10;
        const result = a > b ? a * 2 : b * 2;
        
        code = `#include <stdio.h>\\n\\nint main() {\\n  int a = ${a}, b = ${b};\\n  int result;\\n  if(a > b)\\n    result = a * 2;\\n  else\\n    result = b * 2;\\n  printf(\\\"%d\\\", result);\\n  return 0;\\n}`;
        answer = result.toString();
    }
    
    else if (selectedType === 'switchStmt') {
        const num = Math.floor(Math.random() * 5) + 1;
        let result = 0;
        switch(num) {
            case 1: result = 10; break;
            case 2: result = 20; break;
            case 3: result = 30; break;
            case 4: result = 40; break;
            default: result = 50;
        }
        
        code = `#include <stdio.h>\\n\\nint main() {\\n  int num = ${num};\\n  int result;\\n  switch(num) {\\n    case 1: result = 10; break;\\n    case 2: result = 20; break;\\n    case 3: result = 30; break;\\n    case 4: result = 40; break;\\n    default: result = 50;\\n  }\\n  printf(\\\"%d\\\", result);\\n  return 0;\\n}`;
        answer = result.toString();
    }
    
    // ========== 반복문 ==========
    else if (selectedType === 'forLoop') {
        const start = Math.floor(Math.random() * 3);
        const end = 5 + Math.floor(Math.random() * 6);
        let sum = 0;
        for(let i = start; i <= end; i++) sum += i;
        
        code = `#include <stdio.h>\\n\\nint main() {\\n  int sum = 0;\\n  for(int i = ${start}; i <= ${end}; i++) {\\n    sum += i;\\n  }\\n  printf(\\\"%d\\\", sum);\\n  return 0;\\n}`;
        answer = sum.toString();
    }
    
    else if (selectedType === 'whileLoop') {
        const limit = 5 + Math.floor(Math.random() * 6);
        let sum = 0, i = 0;
        while(i <= limit) {
            sum += i;
            i++;
        }
        
        code = `#include <stdio.h>\\n\\nint main() {\\n  int sum = 0, i = 0;\\n  while(i <= ${limit}) {\\n    sum += i;\\n    i++;\\n  }\\n  printf(\\\"%d\\\", sum);\\n  return 0;\\n}`;
        answer = sum.toString();
    }
    
    else if (selectedType === 'doWhile') {
        const limit = 3 + Math.floor(Math.random() * 5);
        let sum = 0, i = 1;
        do {
            sum += i;
            i++;
        } while(i <= limit);
        
        code = `#include <stdio.h>\\n\\nint main() {\\n  int sum = 0, i = 1;\\n  do {\\n    sum += i;\\n    i++;\\n  } while(i <= ${limit});\\n  printf(\\\"%d\\\", sum);\\n  return 0;\\n}`;
        answer = sum.toString();
    }
    
    else if (selectedType === 'breakContinue') {
        let sum = 0;
        for(let i = 1; i <= 10; i++) {
            if(i % 2 === 1) continue;
            sum += i;
        }
        
        code = `#include <stdio.h>\\n\\nint main() {\\n  int sum = 0;\\n  for(int i = 1; i <= 10; i++) {\\n    if(i % 2 == 1)\\n      continue;\\n    sum += i;\\n  }\\n  printf(\\\"%d\\\", sum);\\n  return 0;\\n}`;
        answer = sum.toString();
    }
    
    else if (selectedType === 'nestedLoop') {
        const n = 3 + Math.floor(Math.random() * 2);
        let sum = 0;
        for(let i = 1; i <= n; i++) {
            for(let j = 1; j <= n; j++) {
                sum += i * j;
            }
        }
        
        code = `#include <stdio.h>\\n\\nint main() {\\n  int sum = 0;\\n  for(int i = 1; i <= ${n}; i++) {\\n    for(int j = 1; j <= ${n}; j++) {\\n      sum += i * j;\\n    }\\n  }\\n  printf(\\\"%d\\\", sum);\\n  return 0;\\n}`;
        answer = sum.toString();
    }
    
    // ========== 배열 & 포인터 ==========
    else if (selectedType === 'array') {
        const len = 4 + Math.floor(Math.random() * 3);
        const arr = Array.from({length: len}, (_, i) => (i + 1) * 10);
        const sum = arr.reduce((a, b) => a + b, 0);
        
        code = `#include <stdio.h>\\n\\nint main() {\\n  int arr[] = {${arr.join(', ')}};\\n  int sum = 0;\\n  for(int i = 0; i < ${len}; i++) {\\n    sum += arr[i];\\n  }\\n  printf(\\\"%d\\\", sum);\\n  return 0;\\n}`;
        answer = sum.toString();
    }
    
    else if (selectedType === 'pointer') {
        const a = 10 + Math.floor(Math.random() * 30);
        const b = 20 + Math.floor(Math.random() * 30);
        
        code = `#include <stdio.h>\\n\\nint main() {\\n  int a = ${a};\\n  int *p = &a;\\n  *p = ${b};\\n  printf(\\\"%d\\\", a);\\n  return 0;\\n}`;
        answer = b.toString();
    }
    
    else if (selectedType === 'arrayPointer') {
        const arr = [10, 20, 30, 40];
        const idx = Math.floor(Math.random() * 3) + 1;
        
        code = `#include <stdio.h>\\n\\nint main() {\\n  int arr[] = {${arr.join(', ')}};\\n  int *p = arr;\\n  printf(\\\"%d\\\", *(p + ${idx}));\\n  return 0;\\n}`;
        answer = arr[idx].toString();
    }
    
    else if (selectedType === 'array2d') {
        const sum = 1 + 5 + 9;
        
        code = `#include <stdio.h>\\n\\nint main() {\\n  int arr[3][3] = {{1,2,3},{4,5,6},{7,8,9}};\\n  int sum = 0;\\n  for(int i = 0; i < 3; i++) {\\n    sum += arr[i][i];\\n  }\\n  printf(\\\"%d\\\", sum);\\n  return 0;\\n}`;
        answer = sum.toString();
    }
    
    else if (selectedType === 'pointerArray') {
        const a = 10, b = 20, c = 30;
        
        code = `#include <stdio.h>\\n\\nint main() {\\n  int a = ${a}, b = ${b}, c = ${c};\\n  int *arr[3] = {&a, &b, &c};\\n  printf(\\\"%d\\\", *arr[1] + *arr[2]);\\n  return 0;\\n}`;
        answer = (b + c).toString();
    }
    
    // ========== 구조체 ==========
    else if (selectedType === 'struct') {
        const age = 15 + Math.floor(Math.random() * 10);
        const score = 70 + Math.floor(Math.random() * 30);
        
        code = `#include <stdio.h>\\n\\nstruct Student {\\n  int age;\\n  int score;\\n};\\n\\nint main() {\\n  struct Student s;\\n  s.age = ${age};\\n  s.score = ${score};\\n  printf(\\\"%d\\\", s.age + s.score);\\n  return 0;\\n}`;
        answer = (age + score).toString();
    }
    
    else if (selectedType === 'arrayPointerStruct') {
        const scores = [80, 90, 100];
        const sum = scores.reduce((a, b) => a + b, 0);
        
        code = `#include <stdio.h>\\n\\nstruct Student {\\n  int score[3];\\n};\\n\\nint main() {\\n  struct Student s;\\n  s.score[0] = ${scores[0]};\\n  s.score[1] = ${scores[1]};\\n  s.score[2] = ${scores[2]};\\n  int sum = 0;\\n  for(int i = 0; i < 3; i++)\\n    sum += s.score[i];\\n  printf(\\\"%d\\\", sum);\\n  return 0;\\n}`;
        answer = sum.toString();
    }
    
    // ========== 함수 ==========
    else if (selectedType === 'function') {
        const a = 5 + Math.floor(Math.random() * 10);
        const b = 5 + Math.floor(Math.random() * 10);
        
        code = `#include <stdio.h>\\n\\nint add(int x, int y) {\\n  return x + y;\\n}\\n\\nint main() {\\n  printf(\\\"%d\\\", add(${a}, ${b}));\\n  return 0;\\n}`;
        answer = (a + b).toString();
    }
    
    else if (selectedType === 'functionLoop') {
        const n = 3 + Math.floor(Math.random() * 4);
        let sum = 0;
        for(let i = 1; i <= n; i++) sum += i;
        
        code = `#include <stdio.h>\\n\\nint sumN(int n) {\\n  int sum = 0;\\n  for(int i = 1; i <= n; i++)\\n    sum += i;\\n  return sum;\\n}\\n\\nint main() {\\n  printf(\\\"%d\\\", sumN(${n}));\\n  return 0;\\n}`;
        answer = sum.toString();
    }
    
    else if (selectedType === 'functionAddress') {
        const a = 5, b = 10;
        
        code = `#include <stdio.h>\\n\\nvoid swap(int *x, int *y) {\\n  int temp = *x;\\n  *x = *y;\\n  *y = temp;\\n}\\n\\nint main() {\\n  int a = ${a}, b = ${b};\\n  swap(&a, &b);\\n  printf(\\\"%d %d\\\", a, b);\\n  return 0;\\n}`;
        answer = `${b} ${a}`;
    }
    
    else if (selectedType === 'functionScope') {
        const global = 100;
        const local = 50;
        
        code = `#include <stdio.h>\\n\\nint g = ${global};\\n\\nvoid func() {\\n  int g = ${local};\\n  printf(\\\"%d \\\", g);\\n}\\n\\nint main() {\\n  func();\\n  printf(\\\"%d\\\", g);\\n  return 0;\\n}`;
        answer = `${local} ${global}`;
    }
    
    else if (selectedType === 'functionReturnAddress') {
        const arr = [10, 20, 30];
        const idx = Math.floor(Math.random() * 3);
        
        code = `#include <stdio.h>\\n\\nint* getElement(int arr[], int idx) {\\n  return &arr[idx];\\n}\\n\\nint main() {\\n  int arr[] = {${arr.join(', ')}};\\n  int *p = getElement(arr, ${idx});\\n  printf(\\\"%d\\\", *p);\\n  return 0;\\n}`;
        answer = arr[idx].toString();
    }
    
    else if (selectedType === 'staticVar') {
        let count = 0;
        for(let i = 0; i < 3; i++) count++;
        
        code = `#include <stdio.h>\\n\\nvoid counter() {\\n  static int count = 0;\\n  count++;\\n  printf(\\\"%d \\\", count);\\n}\\n\\nint main() {\\n  counter();\\n  counter();\\n  counter();\\n  return 0;\\n}`;
        answer = '1 2 3';
    }
    
    else if (selectedType === 'recursion') {
        const n = 3 + Math.floor(Math.random() * 3);
        let fact = 1;
        for(let i = 1; i <= n; i++) fact *= i;
        
        code = `#include <stdio.h>\\n\\nint factorial(int n) {\\n  if(n <= 1) return 1;\\n  return n * factorial(n - 1);\\n}\\n\\nint main() {\\n  printf(\\\"%d\\\", factorial(${n}));\\n  return 0;\\n}`;
        answer = fact.toString();
    }
    
    else if (selectedType === 'multiRecursion') {
        const n = 5 + Math.floor(Math.random() * 3);
        function fib(n) {
            if(n <= 1) return n;
            return fib(n-1) + fib(n-2);
        }
        
        code = `#include <stdio.h>\\n\\nint fibonacci(int n) {\\n  if(n <= 1) return n;\\n  return fibonacci(n-1) + fibonacci(n-2);\\n}\\n\\nint main() {\\n  printf(\\\"%d\\\", fibonacci(${n}));\\n  return 0;\\n}`;
        answer = fib(n).toString();
    }
    
    // ========== 기타 ==========
    else {
        const a = 5, b = 10;
        
        code = `#include <stdio.h>\\n\\nint main() {\\n  int a = ${a}, b = ${b};\\n  printf(\\\"%d %d\\\", a++, ++b);\\n  return 0;\\n}`;
        answer = `${a} ${b + 1}`;
    }
    
    categories[categoryIndex].problems[currentProblemIndex].question = 
        `다음 C언어 코드의 출력값을 작성하시오.\\n\\n${code}`;
    
    categories[categoryIndex].problems[currentProblemIndex].answer = answer;
}
// ========================== C언어 세분화 알고리즘 끝 ==========================